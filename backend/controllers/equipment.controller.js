const Equipment = require('../models/equipment.model');
const User = require('../models/user.model');
const { Op } = require('sequelize');

// Get all available equipment
const getAllEquipment = async (req, res) => {
  try {
    const { search, category, location, minPrice, maxPrice } = req.query;
    
    let whereClause = {
      isAvailable: true
    };

    // Search by name or description
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    // Filter by category
    if (category) {
      whereClause.category = category;
    }

    // Filter by location
    if (location) {
      whereClause.location = { [Op.like]: `%${location}%` };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice);
    }

    const equipment = await Equipment.findAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name', 'rating', 'totalLends']
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
        attributes: ['id', 'name', 'rating', 'totalLends', 'phone', 'location']
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

// Create new equipment listing
const createEquipment = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      ownerId,
      ownerName,
      location,
      imageUrl,
      isOnSale,
      deliveryAvailable,
      deliveryCharge,
      category,
      condition
    } = req.body;

    // Validate required fields
    if (!name || !price || !ownerId || !ownerName || !location) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const equipment = await Equipment.create({
      name,
      description,
      price: parseFloat(price),
      ownerId,
      ownerName,
      location,
      imageUrl,
      isOnSale: isOnSale || false,
      deliveryAvailable: deliveryAvailable !== undefined ? deliveryAvailable : true,
      deliveryCharge: deliveryCharge ? parseFloat(deliveryCharge) : 0,
      category: category || 'OTHER',
      condition: condition || 'GOOD'
    });

    res.status(201).json({
      success: true,
      message: 'Equipment listed successfully',
      data: equipment
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

// Update equipment listing
const updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const equipment = await Equipment.findByPk(id);
    
    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    // Only owner can update equipment
    if (equipment.ownerId !== parseInt(req.body.ownerId)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to update this equipment'
      });
    }

    await equipment.update(updateData);

    res.json({
      success: true,
      message: 'Equipment updated successfully',
      data: equipment
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

// Delete equipment listing
const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { ownerId } = req.body;

    const equipment = await Equipment.findByPk(id);
    
    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    // Only owner can delete equipment
    if (equipment.ownerId !== parseInt(ownerId)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to delete this equipment'
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

// Get equipment by owner
const getEquipmentByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const equipment = await Equipment.findAll({
      where: { ownerId },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: equipment,
      count: equipment.length
    });
  } catch (error) {
    console.error('Error fetching owner equipment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch equipment',
      error: error.message
    });
  }
};

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipmentByOwner
}; 