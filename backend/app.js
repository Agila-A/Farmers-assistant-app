const express = require('express');
const app = express();
const exampleRoutes = require('./routes/example.routes');
const sequelize = require('./models');

app.use(express.json());
app.use('/api/example', exampleRoutes);

module.exports = app;
