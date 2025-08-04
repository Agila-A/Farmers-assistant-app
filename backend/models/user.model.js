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
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  profileImage: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00,
    validate: {
      min: 0,
      max: 5
    }
  },
  totalRentals: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalLends: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  tableName: 'users',
  timestamps: true
});

module.exports = User; 