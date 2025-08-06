const db = require('../config/database');

// Create Expense
exports.create = (data, callback) => {
  const { title, amount, date, category, receipt_url } = data;
  const sql = "INSERT INTO budgetTracker (title, amount, date, category, receipt_url) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, amount, date, category, receipt_url], callback);
};

// Get All Expenses
exports.getAll = (callback) => {
  db.query("SELECT * FROM budgetTracker ORDER BY date DESC", callback);
};

// Get by specific date
exports.getByDate = (date, callback) => {
  db.query("SELECT * FROM budgetTracker WHERE date = ?", [date], callback);
};

// Get by date range (week)
exports.getByWeek = (start, end, callback) => {
  db.query("SELECT * FROM budgetTracker WHERE date BETWEEN ? AND ?", [start, end], callback);
};

// Get by month
exports.getByMonth = (year, month, callback) => {
  db.query("SELECT * FROM budgetTracker WHERE YEAR(date) = ? AND MONTH(date) = ?", [year, month], callback);
};

// Get by category
exports.getByCategory = (category, callback) => {
  db.query("SELECT * FROM budgetTracker WHERE category = ?", [category], callback);
};

// Update expense
exports.update = (id, data, callback) => {
  const { title, amount, date, category } = data;
  db.query(
    "UPDATE budgetTracker SET title = ?, amount = ?, date = ?, category = ? WHERE id = ?",
    [title, amount, date, category, id],
    callback
  );
};

// Delete expense
exports.delete = (id, callback) => {
  db.query("DELETE FROM budgetTracker WHERE id = ?", [id], callback);
};

// Get total amount
exports.getTotalAmount = (callback) => {
  db.query("SELECT SUM(amount) AS total FROM budgetTracker", callback);
};

// Get total by category
exports.getTotalByCategory = (callback) => {
  db.query("SELECT category, SUM(amount) AS total FROM budgetTracker GROUP BY category", callback);
};

