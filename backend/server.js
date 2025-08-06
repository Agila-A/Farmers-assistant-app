
const express = require('express');
const cors = require('cors');
const budgetRoutes = require('./routes/budgetTracker.routes');
const userRoutes = require('./routes/user.routes');
const equipmentRoutes = require('./routes/equipment.routes');
const rentalRequestRoutes = require('./routes/rental-request.routes');
const taskRoutes = require('./routes/task.routes');
const uploadRoutes = require('./routes/upload.routes');
const expenseRoutes = require('./routes/expense.routes');

const app = express();
require('dotenv').config();

const db = require('./config/database');
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/budget', budgetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/rental-requests', rentalRequestRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
  res.send('API Running...');
});

const PORT = process.env.PORT || 5000;
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
