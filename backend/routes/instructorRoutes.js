const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

router.get('/', async (req, res) => {
  try {
    const data = await Instructor.find();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
