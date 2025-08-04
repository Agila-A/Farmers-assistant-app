const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipment.controller');

// Get all available equipment (with optional filters)
router.get('/', equipmentController.getAllEquipment);

// Get equipment by ID
router.get('/:id', equipmentController.getEquipmentById);

// Create new equipment listing
router.post('/', equipmentController.createEquipment);

// Update equipment listing
router.put('/:id', equipmentController.updateEquipment);

// Delete equipment listing
router.delete('/:id', equipmentController.deleteEquipment);

// Get equipment by owner
router.get('/owner/:ownerId', equipmentController.getEquipmentByOwner);

module.exports = router; 