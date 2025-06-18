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
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_URI = process.env.MONGO_URI;

// Setup CORS with simplified origin check
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin === FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle favicon requests
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Connect to MongoDB with timeout
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    // Don't exit process in production as it will crash the serverless function
    if (NODE_ENV === 'development') {
      process.exit(1);
    }
  }
};

// Initialize DB connection
connectDB();

// API Routes
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

// Start server only in development environment
if (NODE_ENV === 'development') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${BACKEND_URL || `http://localhost:${PORT}`}`);
    console.log(`🩺 Health check: ${BACKEND_URL || `http://localhost:${PORT}`}/api/health`);
  });
}

// Export for Vercel serverless
module.exports = serverless(app);