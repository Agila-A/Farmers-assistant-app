const express = require('express');
require('dotenv').config();
const sequelize = require('./models');
const taskRoutes = require('./routes/task.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// 🔌 Route registration
app.use('/api/tasks', taskRoutes);

// 🔧 Optional: Test route (API Health Check)
app.get('/', (req, res) => {
  res.send('🚀 API is up and running!');
});

// 🗄️ Connect to Sequelize and start the server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
    console.log('✅ All models synchronized with the database.');
  })
  .catch(err => {
    console.error('❌ Failed to sync models:', err);
  });
