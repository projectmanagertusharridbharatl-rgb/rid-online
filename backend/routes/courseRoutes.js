const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor category');
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const c = await Course.findOne({ slug: req.params.slug }).populate('instructor category');
    if (!c) return res.status(404).json({ message: 'Not found' });
    res.json(c);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router; // ✅ keep this last line
