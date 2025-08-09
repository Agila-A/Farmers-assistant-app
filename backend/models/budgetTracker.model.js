const { DataTypes } = require('sequelize');
const sequelize = require('./index');// Adjust path if needed

const BudgetTracker = sequelize.define('budgetTracker', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: { 
    type: DataTypes.STRING,
    allowNull: true
  },
  receipt_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'budgetTracker',
  timestamps: false
});

module.exports = BudgetTracker;