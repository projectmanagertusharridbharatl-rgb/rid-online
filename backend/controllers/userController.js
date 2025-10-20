const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      bio: req.body.bio
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's enrolled courses
// @route   GET /api/users/enrolled-courses
// @access  Private
exports.getEnrolledCourses = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate({
        path: 'course',
        populate: {
          path: 'instructor',
          select: 'name'
        }
      });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's created courses (for instructors)
// @route   GET /api/users/my-courses
// @access  Private
exports.getMyCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ instructor: req.user.id })
      .populate('videos')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};












// const User = require('../models/User');
// const Course = require('../models/Course');
// const Enrollment = require('../models/Enrollment');
// const path = require('path');
// const fs = require('fs');

// // @desc    Get user profile
// // @route   GET /api/users/profile
// // @access  Private
// exports.getUserProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);

//     res.status(200).json({
//       success: true,
//       data: user
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Update user profile
// // @route   PUT /api/users/profile
// // @access  Private
// exports.updateUserProfile = async (req, res, next) => {
//   try {
//     const fieldsToUpdate = {
//       name: req.body.name,
//       email: req.body.email,
//       bio: req.body.bio
//     };

//     // ✅ Handle avatar upload
//     if (req.file) {
//       fieldsToUpdate.avatar = req.file.filename;
      
//       // Delete old avatar if it exists and is not default
//       const user = await User.findById(req.user.id);
//       if (user.avatar && user.avatar !== 'default-avatar.png') {
//         const oldAvatarPath = path.join(__dirname, '../uploads/avatars', user.avatar);
//         if (fs.existsSync(oldAvatarPath)) {
//           fs.unlinkSync(oldAvatarPath);
//         }
//       }
//     }

//     const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
//       new: true,
//       runValidators: true
//     });

//     res.status(200).json({
//       success: true,
//       data: user
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get user's enrolled courses
// // @route   GET /api/users/enrolled-courses
// // @access  Private
// exports.getEnrolledCourses = async (req, res, next) => {
//   try {
//     const enrollments = await Enrollment.find({ student: req.user.id })
//       .populate({
//         path: 'course',
//         populate: {
//           path: 'instructor',
//           select: 'name'
//         }
//       });

//     res.status(200).json({
//       success: true,
//       count: enrollments.length,
//       data: enrollments
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get user's created courses (for instructors)
// // @route   GET /api/users/my-courses
// // @access  Private
// exports.getMyCourses = async (req, res, next) => {
//   try {
//     const courses = await Course.find({ instructor: req.user.id })
//       .populate('videos')
//       .sort('-createdAt');

//     res.status(200).json({
//       success: true,
//       count: courses.length,
//       data: courses
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };