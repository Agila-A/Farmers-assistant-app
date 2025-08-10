const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user.model');

const Equipment = sequelize.define('Equipment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
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
  availableFrom: {
    type: DataTypes.DATE,
    allowNull: true
  },
  availableTo: {
    type: DataTypes.DATE,
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('TRACTOR', 'TOOL', 'MANURE', 'CONVEYOR', 'OTHER'),
    defaultValue: 'OTHER'
  },
  condition: {
    type: DataTypes.ENUM('EXCELLENT', 'GOOD', 'FAIR', 'POOR'),
    defaultValue: 'GOOD'
  },
}, {
  tableName: 'equipment',
  timestamps: true
});

Equipment.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
User.hasMany(Equipment, { foreignKey: 'ownerId', as: 'equipmentListings' });

module.exports = Equipment;