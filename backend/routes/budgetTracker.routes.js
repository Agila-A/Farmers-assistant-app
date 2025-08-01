const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetTracker.controller');
const upload = require('../middleware/upload');

// Add Expense (with file upload)
router.post('/add-expense', upload.single('receipt'), budgetController.addExpense);

// Get All Expenses
router.get('/all-expenses', budgetController.getAllExpenses);

// Get Today's Expenses
router.get('/today', budgetController.getTodayExpenses);

// Get Weekly Expenses
router.get('/weekly', budgetController.getWeeklyExpenses);

// Get Monthly Expenses
router.get('/monthly', budgetController.getMonthlyExpenses);

// Get Expenses by specific date
router.get('/by-date/:date', budgetController.getExpensesByDate);

// Get Expenses by date range (week)
router.get('/by-week/:startDate/:endDate', budgetController.getExpensesByWeek);

// Get Expenses by month
router.get('/by-month/:year/:month', budgetController.getExpensesByMonth);

// Get Expenses by category
router.get('/by-category/:category', budgetController.getExpensesByCategory);

// Update Expense
router.put('/update/:id', budgetController.updateExpense);

// Delete Expense
router.delete('/delete/:id', budgetController.deleteExpense);

// Get Total Amount
router.get('/total', budgetController.getTotalAmount);

// Get Total by Category
router.get('/total-by-category', budgetController.getTotalByCategory);

module.exports = router;
