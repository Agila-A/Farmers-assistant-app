const Budget = require("../models/budgetTracker.model");

exports.addExpense = (req, res) => {
  const data = {
    ...req.body,
    receipt_url: req.file ? req.file.filename : null,
  };

  Budget.create(data, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Expense added", data: results });
  });
};

exports.getAllExpenses = (req, res) => {
  Budget.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getTodayExpenses = (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  Budget.getByDate(today, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getWeeklyExpenses = (req, res) => {
  const today = new Date();
  const end = today.toISOString().split("T")[0];
  const start = new Date(today.setDate(today.getDate() - 6)).toISOString().split("T")[0];

  Budget.getByWeek(start, end, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getMonthlyExpenses = (req, res) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  Budget.getByMonth(year, month, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getExpensesByDate = (req, res) => {
  const { date } = req.params;
  Budget.getByDate(date, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getExpensesByWeek = (req, res) => {
  const { startDate, endDate } = req.params;
  Budget.getByWeek(startDate, endDate, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getExpensesByMonth = (req, res) => {
  const { year, month } = req.params;
  Budget.getByMonth(year, month, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getExpensesByCategory = (req, res) => {
  const { category } = req.params;
  Budget.getByCategory(category, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.updateExpense = (req, res) => {
  const { id } = req.params;
  Budget.update(id, req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Expense updated", data: results });
  });
};

exports.deleteExpense = (req, res) => {
  const { id } = req.params;
  Budget.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Expense deleted", data: results });
  });
};

exports.getTotalAmount = (req, res) => {
  Budget.getTotalAmount((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.getTotalByCategory = (req, res) => {
  Budget.getTotalByCategory((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

