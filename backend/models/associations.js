const Equipment = require('./equipment.model');
const RentalRequest = require('./rental-request.model');
const User = require('./user.model');

// Equipment belongs to User (owner)
Equipment.belongsTo(User, {
  foreignKey: 'ownerId',
  as: 'owner'
});

// User has many Equipment (as owner)
User.hasMany(Equipment, {
  foreignKey: 'ownerId',
  as: 'ownedEquipment'
});

// RentalRequest belongs to Equipment
RentalRequest.belongsTo(Equipment, {
  foreignKey: 'equipmentId',
  as: 'equipment'
});

// Equipment has many RentalRequests
Equipment.hasMany(RentalRequest, {
  foreignKey: 'equipmentId',
  as: 'rentalRequests'
});

// RentalRequest belongs to User (requester)
RentalRequest.belongsTo(User, {
  foreignKey: 'requesterId',
  as: 'requester'
});

// User has many RentalRequests (as requester)
User.hasMany(RentalRequest, {
  foreignKey: 'requesterId',
  as: 'rentalRequests'
});

module.exports = {
  Equipment,
  RentalRequest,
  User
}; 