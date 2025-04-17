const db = require('../config/db.js');

exports.findOrganizerByEmail = (email) => {
    return new Promise((resolve,reject) => {
        const query = 'SELECT * FROM organizer WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.createOrganizer  = (name, email, password, phone, description) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO organizer (name, email, password, contact_info, description) VALUES (?,?,?,?,?)';
        db.query(query, [name, email, password, phone, description], (err, results) => {
            if(err) return reject(err);
            resolve(results);
        });
    });
};
