const db = require('../config/db'); 


// Find an existing user by their Email
exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user WHERE email = ?';
    
    // Execute select query
    db.query(query, [email], (err, results) => {
      if (err) return reject(err); // Handle query error
      resolve(results[0]);          // Return the first matching user
    });
  });
};

// Create (Insert) a new User
exports.createUser = (name, email, password, phone, year_of_study) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO user (name, email, password, phone, year_of_study) VALUES (?, ?, ?, ?, ?)';
    
    // Execute insert query
    db.query(query, [name, email, password, phone, year_of_study], (err, results) => {
      if (err) return reject(err); // Handle error
      resolve(results);            // Return insertion result
    });
  });
};

