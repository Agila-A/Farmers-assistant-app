const Equipment = require('../models/equipment.model');
const User = require('../models/user.model');
const { getOrCreateUser } = require('../utils/userMapping');
const { Op } = require('sequelize');

const createEquipment = async (req, res) => {
  try {
    const { name, price, ownerId, ownerName, location, imageUrl, description, deliveryAvailable, deliveryCharge, category, condition, availableFrom, availableTo } = req.body;

    if (!name || !price || !ownerId || !ownerName || !location) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    // Get or create user based on Firebase UID
    const user = await getOrCreateUser(ownerId, ownerName);
    
    const newEquipment = await Equipment.create({
      name,
      description,
      price: parseFloat(price),
      ownerId: user.id, // Use database user ID
      ownerName,
      location,
      imageUrl,
      isAvailable: true,
      deliveryAvailable: deliveryAvailable !== undefined ? deliveryAvailable : true,
      deliveryCharge: deliveryCharge ? parseFloat(deliveryCharge) : 0,
      availableFrom: availableFrom ? new Date(availableFrom) : null,
      availableTo: availableTo ? new Date(availableTo) : null,
      category,
      condition
    });

    res.status(201).json({
      success: true,
      message: 'Equipment listed successfully',
      data: newEquipment
    });
  } catch (error) {
    console.error('Error creating equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create equipment listing',
      error: error.message
    });
  }
};

const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findAll({
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: equipment,
      count: equipment.length
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch equipment',
      error: error.message
    });
  }
};

// Get equipment by ID
const getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findByPk(id, {
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name']
      }]
    });

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    res.json({
      success: true,
      data: equipment
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch equipment',
      error: error.message
    });
  }
};

// Update equipment
const updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, ownerId, ownerName, location, imageUrl, description, deliveryAvailable, deliveryCharge, category, condition, availableFrom, availableTo } = req.body;

    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    // If ownerId (Firebase UID) is provided, get or create the user
    let databaseUserId = equipment.ownerId;
    if (ownerId) {
      const user = await getOrCreateUser(ownerId, ownerName);
      databaseUserId = user.id;
    }

    const updatedEquipment = await equipment.update({
      name: name || equipment.name,
      description: description || equipment.description,
      price: price ? parseFloat(price) : equipment.price,
      ownerId: databaseUserId,
      ownerName: ownerName || equipment.ownerName,
      location: location || equipment.location,
      imageUrl: imageUrl || equipment.imageUrl,
      isAvailable: equipment.isAvailable,
      deliveryAvailable: deliveryAvailable !== undefined ? deliveryAvailable : equipment.deliveryAvailable,
      deliveryCharge: deliveryCharge ? parseFloat(deliveryCharge) : equipment.deliveryCharge,
      availableFrom: availableFrom ? new Date(availableFrom) : equipment.availableFrom,
      availableTo: availableTo ? new Date(availableTo) : equipment.availableTo,
      category: category || equipment.category,
      condition: condition || equipment.condition
    });

    res.json({
      success: true,
      message: 'Equipment updated successfully',
      data: updatedEquipment
    });
  } catch (error) {
    console.error('Error updating equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update equipment',
      error: error.message
    });
  }
};

// Delete equipment
const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findByPk(id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    await equipment.destroy();

    res.json({
      success: true,
      message: 'Equipment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete equipment',
      error: error.message
    });
  }
};

module.exports = {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment
};