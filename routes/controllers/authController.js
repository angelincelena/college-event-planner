const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const userModel = require('../models/userModel');
const organizerModel = require('../models/organizerModel'); 
const db = require('../config/db'); 

// Login Controller
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  // Validation: All fields are required
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Select table based on role (student or organizer)
    const table = role === 'student' ? 'user' : 'organizer';
    const idField = role === 'student' ? 'user_id' : 'organizer_id';

    // Fetch user from database by email
    const [rows] = await db.promise().query(`SELECT * FROM ${table} WHERE email = ?`, [email]);

    // If user not found
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT Token ( tried didnt work)
    const token = jwt.sign(
      { id: user[idField], role }, 
      process.env.JWT_SECRET || 'JWT_SECRET',
      { expiresIn: '1h' }
    );

    // Send successful response
    res.status(200).json({
      token,
      userId: user[idField],
      role,
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Register Student Controller
exports.registerStudent = async (req, res) => {
  const { name, email, password, phone, year_of_study } = req.body;

  try {
    // Check if student already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new student into database
    const newStudent = await userModel.createUser(name, email, hashedPassword, phone, year_of_study);

    // Send success response
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering student', error: err });
  }
};


// Register Organizer Controller
exports.registerOrganizer = async (req, res) => {
  const { name, email, password, phone, description } = req.body;

  try {
    // Check if organizer already exists
    const existingOrganizer = await organizerModel.findOrganizerByEmail(email);
    if (existingOrganizer) {
      return res.status(400).json({ message: 'Organizer already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new organizer into database
    const newOrganizer = await organizerModel.createOrganizer(name, email, hashedPassword, phone, description);

    // Send success response
    res.status(201).json({ message: 'Organizer registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering organizer', error: err });
  }
};
