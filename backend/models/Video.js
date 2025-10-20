const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a video title'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  videoUrl: {
    type: String,
    required: [true, 'Please add a video URL']
  },
  duration: {
    type: Number, // in seconds
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Video', videoSchema);