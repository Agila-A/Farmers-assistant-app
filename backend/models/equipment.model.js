const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Equipment = sequelize.define('Equipment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ownerName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  isOnSale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  deliveryAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  deliveryCharge: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  category: {
    type: DataTypes.ENUM('TRACTOR', 'TOOL', 'MANURE', 'CONVEYOR', 'OTHER'),
    defaultValue: 'OTHER'
  },
  condition: {
    type: DataTypes.ENUM('EXCELLENT', 'GOOD', 'FAIR', 'POOR'),
    defaultValue: 'GOOD'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'equipment',
  timestamps: true
});

module.exports = Equipment; 