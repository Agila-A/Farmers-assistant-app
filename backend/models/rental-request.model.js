const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const RentalRequest = sequelize.define('RentalRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  equipmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'equipment',
      key: 'id'
    }
  },
  requesterId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  requesterName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  requesterContact: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'APPROVED', 'DECLINED', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'PENDING'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  securityDeposit: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 500.00
  },
  paymentStatus: {
    type: DataTypes.ENUM('PENDING', 'PAID', 'REFUNDED'),
    defaultValue: 'PENDING'
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
  tableName: 'rental_requests',
  timestamps: true
});

module.exports = RentalRequest; 