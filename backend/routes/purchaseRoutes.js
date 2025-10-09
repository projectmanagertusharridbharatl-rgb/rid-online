const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Course = require('../models/Course');

router.post('/', async (req, res) => {
  try {
    const p = new Purchase(req.body);
    await p.save();
    await Course.findByIdAndUpdate(p.course, { $inc: { students: 1 } });
    res.status(201).json(p);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
