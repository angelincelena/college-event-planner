const db = require('../config/db'); 

// Create a New Event Controller
exports.createEvent = async (req, res) => {
  const { title, date, time, location, description, category, organizer_id } = req.body;

  // Validation: Check if all fields are provided
  if (!title || !date || !time || !location || !description || !category || !organizer_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Step 1: Insert event into event table
    const insertEventQuery = `
      INSERT INTO event (title, date, time, location, description, organizer_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [eventResult] = await db.promise().query(insertEventQuery, [
      title, date, time, location, description, organizer_id,
    ]);

    const eventId = eventResult.insertId; // Get inserted event's ID

    // Step 2: Validate if the provided category exists
    const [categoryRow] = await db.promise().query(
      'SELECT category_id FROM category WHERE category_id = ?',
      [category]
    );

    if (!categoryRow.length) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Step 3: Insert event-category relation into event_category table
    const insertCategoryQuery = `INSERT INTO event_category (event_id, category_id) VALUES (?, ?)`;
    await db.promise().query(insertCategoryQuery, [eventId, categoryRow[0].category_id]);

    // Success response
    res.status(201).json({ message: 'Event created successfully' });

  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get All Events Controller
exports.getEvents = async (req, res) => {
  try {
    // Join event + category + organizer tables to show all details
    const query = `
      SELECT 
        event.event_id, 
        event.title, 
        event.date, 
        event.time, 
        event.location, 
        event.description, 
        category.name AS category, 
        organizer.name AS organizerName
      FROM event
      JOIN event_category ON event.event_id = event_category.event_id
      JOIN category ON event_category.category_id = category.category_id
      JOIN organizer ON event.organizer_id = organizer.organizer_id
      ORDER BY event.date ASC, event.time ASC
    `;
    
    const [events] = await db.promise().query(query);

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }

    res.status(200).json({ events });

  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};