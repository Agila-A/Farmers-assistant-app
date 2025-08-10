const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  firebaseUid: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;