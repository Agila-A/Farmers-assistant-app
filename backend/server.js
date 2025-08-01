
const express = require('express');
const cors = require('cors');
const budgetRoutes = require('./routes/budgetTracker.routes');

const app = express();
require('dotenv').config();

// Import database connection
const db = require('./config/database');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // to access uploaded files

// Budget Tracker Routes
app.use('/api/budget', budgetRoutes);

app.get('/', (req, res) => {
  res.send('API Running...');
});

const PORT = process.env.PORT || 5000;

// Start server only after database connection is established
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
  
  console.log('✅ Database connected successfully!');
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
