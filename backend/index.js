require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http');

// Initialize Express app
const app = express();

// Load environment variables
const FRONTEND_URL = process.env.FRONTEND_URL; // e.g., http://localhost:5173
const BACKEND_URL = process.env.BACKEND_URL;   // e.g., http://localhost:3000
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_URI = process.env.MONGO_URI;

// Setup CORS
const allowedOrigins = [FRONTEND_URL];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});
// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/profile', require('./src/routes/profile'));
app.use('/api/interview', require('./src/routes/interview'));
app.use('/api/feedback', require('./src/routes/feedback'));
app.use('/api/resume', require('./src/routes/resumeRoutes'));
app.use('/api/interview-prep', require('./src/routes/interviewPrep'));
app.use('/api/mock-test', require('./src/routes/mockTest'));

// 404 Handler
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size should be less than 5MB' });
    }
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${BACKEND_URL}`);
    console.log(`🩺 Health check: ${BACKEND_URL}/api/health`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
  console.error('❗ Unhandled Promise Rejection:', err);
  if (NODE_ENV === 'production') process.exit(1);
});

// Uncaught Exception
process.on('uncaughtException', (err) => {
  console.error('❗ Uncaught Exception:', err);
  if (NODE_ENV === 'production') process.exit(1);
});

module.exports = serverless(app);