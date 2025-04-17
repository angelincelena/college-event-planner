const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User Login Route
router.post('/login', authController.loginUser);

// Student Registration Route
router.post('/register-student', authController.registerStudent);

// Organizer Registration Route
router.post('/register-organizer', authController.registerOrganizer);

module.exports = router;
