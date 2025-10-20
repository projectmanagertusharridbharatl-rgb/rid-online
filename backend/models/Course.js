const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'javascript',
      'python',
      'mobile',
      'cybersecurity',
      'react',
      'cloud',
      'web',
      'ai',
      'data'
    ]
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  thumbnail: {
    type: String,
    default: 'default-thumbnail.jpg'
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: {
    type: Number, // in hours
    required: [true, 'Please add course duration']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  studentsEnrolled: {
    type: Number,
    default: 0
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  tags: [String],
  requirements: [String],
  learningOutcomes: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);