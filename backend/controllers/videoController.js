const Video = require('../models/Video');
const Course = require('../models/Course');

// @desc    Get all videos for a course
// @route   GET /api/courses/:courseId/videos
// @access  Public
exports.getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({ course: req.params.courseId }).sort('order');

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
exports.getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).populate('course');

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new video
// @route   POST /api/courses/:courseId/videos
// @access  Private
exports.createVideo = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Make sure user is course owner
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'User not authorized to add videos to this course'
      });
    }

    // Video data prepare karen
    const videoData = {
      title: req.body.title,
      description: req.body.description,
      course: req.params.courseId,
      order: req.body.order || 0,
      duration: req.body.duration || 0,
      isPreview: req.body.isPreview || false
    };

    // Agar video file upload hui hai
    if (req.file) {
      videoData.videoUrl = `/uploads/videos/${req.file.filename}`;
    }

    const video = await Video.create(videoData);

    // Video ko course mein add karen
    course.videos.push(video._id);
    await course.save();

    res.status(201).json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Private
exports.updateVideo = async (req, res, next) => {
  try {
    let video = await Video.findById(req.params.id).populate('course');

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Make sure user is course owner
    if (video.course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'User not authorized to update this video'
      });
    }

    video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private
exports.deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).populate('course');

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Make sure user is course owner
    if (video.course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'User not authorized to delete this video'
      });
    }

    await Video.findByIdAndDelete(req.params.id);

    // Video ko course se remove karen
    await Course.findByIdAndUpdate(video.course._id, {
      $pull: { videos: video._id }
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};