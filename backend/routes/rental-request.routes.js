const express = require('express');
const router = express.Router();
const rentalRequestController = require('../controllers/rental-request.controller');

// Create a new rental request
router.post('/', rentalRequestController.createRentalRequest);

// Get rental requests for a lender (equipment owner)
router.get('/lender/:ownerId', rentalRequestController.getLenderRequests);

// Get rental requests for a borrower
router.get('/borrower/:requesterId', rentalRequestController.getBorrowerRequests);

// Get rental request by ID
router.get('/:id', rentalRequestController.getRequestById);

// Update rental request status (approve/decline)
router.put('/:id/status', rentalRequestController.updateRequestStatus);

// Cancel rental request
router.put('/:id/cancel', rentalRequestController.cancelRequest);

// Complete rental
router.put('/:id/complete', rentalRequestController.completeRental);

module.exports = router; 