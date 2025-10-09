const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
