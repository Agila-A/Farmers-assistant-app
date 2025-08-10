const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Import the Sequelize connection
const sequelize = require('./models/index');

// Import all route modules
const budgetRoutes = require('./routes/budgetTracker.routes');
const taskRoutes = require('./routes/task.routes');
const uploadRoutes = require('./routes/upload.routes'); // Keep this for your teammate's work
const expenseRoutes = require('./routes/expense.routes');
const equipmentRoutes = require('./routes/equipment.routes');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Use the routes
app.use('/api/budget', budgetRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/upload', uploadRoutes); // Keep this for your teammate's work
app.use('/api/expenses', expenseRoutes);
app.use('/api/equipment', equipmentRoutes); // Added your equipment routes here

app.get('/', (req, res) => {
  res.send('API Running...');
});

const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
    
    // This will create/update tables based on your models
    await sequelize.sync({ alter: true }); 
    console.log('✅ All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to the database or start the server:', err);
    process.exit(1);
  }
};

startServer();