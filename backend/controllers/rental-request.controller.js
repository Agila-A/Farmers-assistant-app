const RentalRequest = require('../models/rental-request.model');
const Equipment = require('../models/equipment.model');
const User = require('../models/user.model');

// Create a new rental request
const createRentalRequest = async (req, res) => {
  try {
    const {
      equipmentId,
      requesterId,
      requesterName,
      requesterContact,
      startDate,
      endDate,
      totalAmount,
      message
    } = req.body;

    // Validate required fields
    if (!equipmentId || !requesterId || !requesterName || !requesterContact || !startDate || !endDate || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if equipment exists and is available
    const equipment = await Equipment.findByPk(equipmentId);
    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    if (!equipment.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Equipment is not available for rental'
      });
    }

    // Check if requester is not the owner
    if (equipment.ownerId === parseInt(requesterId)) {
      return res.status(400).json({
        success: false,
        message: 'You cannot rent your own equipment'
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start < now) {
      return res.status(400).json({
        success: false,
        message: 'Start date cannot be in the past'
      });
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    const rentalRequest = await RentalRequest.create({
      equipmentId,
      requesterId,
      requesterName,
      requesterContact,
      startDate: start,
      endDate: end,
      totalAmount: parseFloat(totalAmount),
      message: message || null
    });

    res.status(201).json({
      success: true,
      message: 'Rental request created successfully',
      data: rentalRequest
    });
  } catch (error) {
    console.error('Error creating rental request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create rental request',
      error: error.message
    });
  }
};

// Get rental requests for a lender (equipment owner)
const getLenderRequests = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const requests = await RentalRequest.findAll({
      include: [{
        model: Equipment,
        where: { ownerId },
        attributes: ['id', 'name', 'imageUrl', 'price']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: requests,
      count: requests.length
    });
  } catch (error) {
    console.error('Error fetching lender requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rental requests',
      error: error.message
    });
  }
};

// Get rental requests for a borrower
const getBorrowerRequests = async (req, res) => {
  try {
    const { requesterId } = req.params;

    const requests = await RentalRequest.findAll({
      where: { requesterId },
      include: [{
        model: Equipment,
        attributes: ['id', 'name', 'imageUrl', 'price', 'ownerName']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: requests,
      count: requests.length
    });
  } catch (error) {
    console.error('Error fetching borrower requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rental requests',
      error: error.message
    });
  }
};

// Update rental request status (approve/decline)
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, ownerId } = req.body;

    const rentalRequest = await RentalRequest.findByPk(id, {
      include: [{
        model: Equipment,
        attributes: ['id', 'ownerId', 'name']
      }]
    });

    if (!rentalRequest) {
      return res.status(404).json({
        success: false,
        message: 'Rental request not found'
      });
    }

    // Verify that the user is the equipment owner
    if (rentalRequest.Equipment.ownerId !== parseInt(ownerId)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to update this request'
      });
    }

    // Update status
    await rentalRequest.update({ status });

    // If approved, mark equipment as unavailable for the rental period
    if (status === 'APPROVED') {
      await Equipment.update(
        { isAvailable: false },
        { where: { id: rentalRequest.equipmentId } }
      );
    }

    res.json({
      success: true,
      message: `Request ${status.toLowerCase()} successfully`,
      data: rentalRequest
    });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update request status',
      error: error.message
    });
  }
};

// Cancel rental request
const cancelRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { requesterId } = req.body;

    const rentalRequest = await RentalRequest.findByPk(id);

    if (!rentalRequest) {
      return res.status(404).json({
        success: false,
        message: 'Rental request not found'
      });
    }

    // Only requester can cancel their own request
    if (rentalRequest.requesterId !== parseInt(requesterId)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to cancel this request'
      });
    }

    // Only pending requests can be cancelled
    if (rentalRequest.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        message: 'Only pending requests can be cancelled'
      });
    }

    await rentalRequest.update({ status: 'CANCELLED' });

    res.json({
      success: true,
      message: 'Request cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel request',
      error: error.message
    });
  }
};

// Complete rental (mark as completed)
const completeRental = async (req, res) => {
  try {
    const { id } = req.params;
    const { ownerId } = req.body;

    const rentalRequest = await RentalRequest.findByPk(id, {
      include: [{
        model: Equipment,
        attributes: ['id', 'ownerId']
      }]
    });

    if (!rentalRequest) {
      return res.status(404).json({
        success: false,
        message: 'Rental request not found'
      });
    }

    // Verify that the user is the equipment owner
    if (rentalRequest.Equipment.ownerId !== parseInt(ownerId)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to complete this rental'
      });
    }

    // Only approved rentals can be completed
    if (rentalRequest.status !== 'APPROVED') {
      return res.status(400).json({
        success: false,
        message: 'Only approved rentals can be completed'
      });
    }

    await rentalRequest.update({ status: 'COMPLETED' });

    // Mark equipment as available again
    await Equipment.update(
      { isAvailable: true },
      { where: { id: rentalRequest.equipmentId } }
    );

    res.json({
      success: true,
      message: 'Rental completed successfully'
    });
  } catch (error) {
    console.error('Error completing rental:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete rental',
      error: error.message
    });
  }
};

// Get rental request by ID
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const rentalRequest = await RentalRequest.findByPk(id, {
      include: [{
        model: Equipment,
        attributes: ['id', 'name', 'imageUrl', 'price', 'ownerName', 'location']
      }]
    });

    if (!rentalRequest) {
      return res.status(404).json({
        success: false,
        message: 'Rental request not found'
      });
    }

    res.json({
      success: true,
      data: rentalRequest
    });
  } catch (error) {
    console.error('Error fetching rental request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rental request',
      error: error.message
    });
  }
};

module.exports = {
  createRentalRequest,
  getLenderRequests,
  getBorrowerRequests,
  updateRequestStatus,
  cancelRequest,
  completeRental,
  getRequestById
}; 