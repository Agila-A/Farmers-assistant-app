const express = require('express');
require('dotenv').config();
const sequelize = require('./models');
const taskRoutes = require('./routes/task.routes');
const equipmentRoutes = require('./routes/equipment.routes');
const rentalRequestRoutes = require('./routes/rental-request.routes');
const userRoutes = require('./routes/user.routes');
const uploadRoutes = require('./routes/upload.routes');

// Import associations to establish model relationships
require('./models/associations');



const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// 🔌 Route registration
app.use('/api/tasks', taskRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/rental-requests', rentalRequestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

// 🔧 Optional: Test route (API Health Check)
app.get('/', (req, res) => {
  res.send('🚀 API is up and running!');
});

// 🗄️ Connect to Sequelize and start the server
sequelize.sync()
  .then(() => {
    console.log('✅ All models synchronized with the database.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to sync models:', err);
  });
