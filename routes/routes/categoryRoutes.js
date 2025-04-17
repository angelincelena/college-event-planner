const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Fetch all categories
router.get('/', async (req, res) => {
  try {
    const [categories] = await db.promise().query('SELECT * FROM category');
    res.status(200).json({ categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
