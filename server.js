const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authroutes');
const bookRoutes = require('./routes/bookroutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Debug middleware to log request details
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Content-Type:', req.get('Content-Type'));
  console.log('Body:', req.body);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Test endpoint
app.post('/api/test', (req, res) => {
  res.json({
    message: 'Test endpoint working',
    body: req.body,
    contentType: req.get('Content-Type'),
    bodyExists: !!req.body
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
