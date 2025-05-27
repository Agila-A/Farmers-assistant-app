const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log("DB info:", {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false, // optional
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected successfully!');
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
};

testConnection();

module.exports = sequelize;
