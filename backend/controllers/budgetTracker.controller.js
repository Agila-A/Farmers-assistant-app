
const Budget = require("../models/budgetTracker.model");

// Add Expense
exports.addExpense = (req, res) => {
  const { title, amount, description, category, date } = req.body;
  const receipt_url = req.file ? req.file.path : null;

  // Validate required fields
  if (!title || !amount || !date) {
    return res.status(400).json({ error: "Title, amount, and date are required" });
  }

  Budget.create({ title, amount, description, receipt_url, category, date }, (err, result) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(201).json({ message: "Expense added successfully", id: result.insertId });
  });
};

// Get All Expenses
exports.getAllExpenses = (req, res) => {
  Budget.getAll((err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(200).json(results);
  });
};

// Get Expenses by Date (Today)
exports.getExpensesByDate = (req, res) => {
  const { date } = req.params;
  Budget.getByDate(date, (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(200).json(results);
  });
};

// Get Expenses by Week
exports.getExpensesByWeek = (req, res) => {
  const { startDate, endDate } = req.params;
  Budget.getByWeek(startDate, endDate, (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(200).json(results);
  });
};

// Get Expenses by Month
exports.getExpensesByMonth = (req, res) => {
  const { year, month } = req.params;
  Budget.getByMonth(year, month, (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(200).json(results);
  });
};

// Get Expenses by Category
exports.getExpensesByCategory = (req, res) => {
  const { category } = req.params;
  Budget.getByCategory(category, (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(200).json(results);
  });
};

// Update Expense
exports.updateExpense = (req, res) => {
  const { id } = req.params;
  const { title, amount, description, category, date } = req.body;

  // Validate required fields
  if (!title || !amount || !date) {
    return res.status(400).json({ error: "Title, amount, and date are required" });
  }

  Budget.update(id, { title, amount, description, category, date }, (err, result) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json({ message: "Expense updated successfully" });
  });
};

// Delete Expense
exports.deleteExpense = (req, res) => {
  const { id } = req.params;

  Budget.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  });
};

// Get Total Amount
exports.getTotalAmount = (req, res) => {
  Budget.getTotalAmount((err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(200).json({ total: results[0].total || 0 });
  });
};

// Get Total by Category
exports.getTotalByCategory = (req, res) => {
  Budget.getTotalByCategory((err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(200).json(results);
  });
};

// Get Today's Expenses
exports.getTodayExpenses = (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  Budget.getByDate(today, (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(200).json(results);
  });
};

// Get Weekly Expenses
exports.getWeeklyExpenses = (req, res) => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate start of week (Monday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  
  // Calculate end of week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  const startDate = startOfWeek.toISOString().split('T')[0];
  const endDate = endOfWeek.toISOString().split('T')[0];
  
  Budget.getByWeek(startDate, endDate, (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(200).json(results);
  });
};

// Get Monthly Expenses
exports.getMonthlyExpenses = (req, res) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  
  Budget.getByMonth(year, month, (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    res.status(200).json(results);
  });
};
