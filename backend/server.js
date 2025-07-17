const express = require('express');
require('dotenv').config();
const sequelize = require('./models');
const Task = require('./models/task.model');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API Running...');
});

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
    console.log('🗄️  All models were synchronized successfully.');
  })
  .catch(err => console.error('❌ Error syncing models:', err));
