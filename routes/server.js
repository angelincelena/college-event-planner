const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

// Load environment variables from .env
dotenv.config();

const app = express();


// CORS Middleware Setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Respond immediately to preflight requests
  if (req.method === 'OPTIONS') return res.sendStatus(200);

  next();
});

// Body parser to read JSON payloads
app.use(express.json());

// Authentication Routes
app.use('/api/auth', authRoutes);

// Event Management Routes
app.use('/api/events', eventRoutes);

// Category Management Routes
app.use('/api/categories', categoryRoutes);

// Event Registration Routes
app.use('/api/registration', registrationRoutes);

// Server Listener
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
