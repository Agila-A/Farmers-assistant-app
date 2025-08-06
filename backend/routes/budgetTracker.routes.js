const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetTracker.controller');
const upload = require('../middleware/upload');

// Add Expense (POST /api/budget)
router.post('/', budgetController.addExpense);

// Get All Expenses (GET /api/budget)
router.get('/', budgetController.getAllExpenses);

// Update Expense (PUT /api/budget/:id)
router.put('/:id', budgetController.updateExpense);

// Delete Expense (DELETE /api/budget/:id)
router.delete('/:id', budgetController.deleteExpense);

// Additional routes for specific queries
router.get('/today', budgetController.getTodayExpenses);
router.get('/weekly', budgetController.getWeeklyExpenses);
router.get('/monthly', budgetController.getMonthlyExpenses);
router.get('/by-date/:date', budgetController.getExpensesByDate);
router.get('/by-week/:startDate/:endDate', budgetController.getExpensesByWeek);
router.get('/by-month/:year/:month', budgetController.getExpensesByMonth);
router.get('/by-category/:category', budgetController.getExpensesByCategory);
router.get('/total', budgetController.getTotalAmount);
router.get('/total-by-category', budgetController.getTotalByCategory);

module.exports = router;

