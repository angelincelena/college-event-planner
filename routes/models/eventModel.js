const db = require('../config/db'); 

// Get all events created by a specific Organizer
exports.getEventsByOrganizerId = (organizerId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM event WHERE organizer_id = ?';

    // Execute the query
    db.query(query, [organizerId], (err, results) => {
      if (err) return reject(err);  // If error, reject the promise
      resolve(results);             // Otherwise, resolve with results
    });
  });
};


// Create a new Event
exports.createEvent = (eventData) => {
  const { title, date, time, location, description, category, organizer_id } = eventData;

  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO event (title, date, time, location, description, organizer_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Execute insert query
    db.query(query, [title, date, time, location, description, organizer_id], (err, result) => {
      if (err) return reject(err);           // If error, reject
      resolve({ insertId: result.insertId }); // Else return the new inserted event ID
    });
  });
};


// Get a single Event by its ID (for viewing or editing)
exports.getEventById = (eventId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM event WHERE event_id = ?', [eventId], (err, result) => {
      if (err) return reject(err);  // Handle error
      resolve(result[0]);           // Return only the first event (eventId is unique)
    });
  });
};