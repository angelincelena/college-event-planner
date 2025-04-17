const db = require('../config/db'); // Import database connection

// ===============================
// Register for an Event Controller
// ===============================
exports.registerForEvent = async (req, res) => {
  const { student_id, event_id } = req.body;

  // Validation: Check if student_id and event_id are provided
  if (!student_id || !event_id) {
    return res.status(400).json({ message: 'Missing student_id or event_id' });
  }

  try {
    // Insert registration record
    await db.promise().query(
      `INSERT INTO registration (user_id, event_id) VALUES (?, ?)`,
      [student_id, event_id]
    );

    res.status(201).json({ message: 'Registered successfully' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ===============================
// Check if Student Already Registered for an Event
// ===============================
exports.checkRegistration = async (req, res) => {
  const { student_id, event_id } = req.query;

  // Validation
  if (!student_id || !event_id) {
    return res.status(400).json({ message: 'Missing student_id or event_id' });
  }

  try {
    // Check if student is already registered
    const [rows] = await db.promise().query(
      `SELECT * FROM registration WHERE user_id = ? AND event_id = ?`,
      [student_id, event_id]
    );

    if (rows.length > 0) {
      return res.status(200).json({ isRegistered: true });
    } else {
      return res.status(200).json({ isRegistered: false });
    }

  } catch (error) {
    console.error('Error checking registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ===============================
// Cancel Event Registration Controller
// ===============================
exports.cancelRegistration = async (req, res) => {
  const { student_id, event_id } = req.body;

  console.log(student_id); // For debugging (you can remove later)

  // Validation
  if (!student_id || !event_id) {
    return res.status(400).json({ message: 'Missing student_id or event_id' });
  }

  try {
    // Delete registration record
    const [result] = await db.promise().query(
      `DELETE FROM registration WHERE user_id = ? AND event_id = ?`,
      [student_id, event_id]
    );

    // Check if any row was deleted
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Registration canceled successfully' });
    } else {
      return res.status(400).json({ message: 'No registration found to cancel' });
    }

  } catch (error) {
    console.error('Error canceling registration:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ===============================
// Get Upcoming Registered Events for Student
// ===============================
exports.getUpcomingRegisteredEvents = async (req, res) => {
  const { student_id } = req.query;

  // Validation
  if (!student_id) {
    return res.status(400).json({ message: 'Student ID is required' });
  }

  try {
    // Fetch upcoming events that the student registered for
    const [rows] = await db.promise().query(
      `SELECT 
         e.event_id, 
         e.title, 
         e.date, 
         e.time, 
         e.location, 
         e.description, 
         o.name AS organizerName
       FROM registration r
       JOIN event e ON r.event_id = e.event_id
       JOIN organizer o ON e.organizer_id = o.organizer_id
       WHERE r.user_id = ? AND e.date > CURDATE()
       ORDER BY e.date ASC`,
      [student_id]
    );

    res.json({ events: rows });

  } catch (err) {
    console.error('Error fetching upcoming registered events:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};