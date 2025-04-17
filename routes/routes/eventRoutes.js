const express = require('express');
const router = express.Router();
const db = require('../config/db');
const eventController = require('../controllers/eventsController');

// Route to fetch all events
router.get('/', eventController.getEvents);

// Route to create a new event
router.post('/add', async (req, res) => {
  const { title, date, time, location, description, organizer_id } = req.body;
  try {
    await db.promise().query(
      'INSERT INTO event (title, date, time, location, description, organizer_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, date, time, location, description, organizer_id]
    );
    res.status(201).json({ message: 'Event created successfully' });
  } catch (err) {
    console.error('Error adding event:', err);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// New Route: Fetch events for a specific organizer
router.get('/organizer/:id', async (req, res) => {
  try {
    const organizerId = req.params.id;

    const [events] = await db.promise().query(
      'SELECT * FROM event WHERE organizer_id = ?',
      [organizerId]
    );

    res.status(200).json({ events });
  } catch (err) {
    console.error('Error fetching organizer events:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Student registered events
router.get('/registration/events', async (req, res) => {
  const studentId = req.query.student_id;

  try {
    const query = `
      SELECT events.* 
      FROM event
      JOIN registrations ON events.event_id = registrations.event_id
      WHERE registrations.student_id = ?;
    `;
    const [events] = await db.execute(query, [studentId]);

    res.json({ events });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

module.exports = router;
