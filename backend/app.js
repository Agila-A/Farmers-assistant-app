const express = require('express');
const app = express();
const exampleRoutes = require('./routes/example.routes');
const taskRoutes = require('./routes/task.routes');
const sequelize = require('./models');

app.use(express.json());
app.use('/api/example', exampleRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;
