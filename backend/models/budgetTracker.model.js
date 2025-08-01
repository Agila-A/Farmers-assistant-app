
const db = require("../config/database");

const Budget = {
  create: (data, callback) => {
    const { title, amount, description, receipt_url, category, date } = data;
    const sql = `
      INSERT INTO budgetTracker (title, amount, description, receipt_url, category, date, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;
    db.query(sql, [title, amount, description, receipt_url, category, date], callback);
  },

  getAll: (callback) => {
    const sql = "SELECT * FROM budgetTracker ORDER BY created_at DESC";
    db.query(sql, callback);
  },

  getByDate: (date, callback) => {
    const sql = "SELECT * FROM budgetTracker WHERE DATE(date) = ? ORDER BY created_at DESC";
    db.query(sql, [date], callback);
  },

  getByWeek: (startDate, endDate, callback) => {
    const sql = "SELECT * FROM budgetTracker WHERE date BETWEEN ? AND ? ORDER BY created_at DESC";
    db.query(sql, [startDate, endDate], callback);
  },

  getByMonth: (year, month, callback) => {
    const sql = "SELECT * FROM budgetTracker WHERE YEAR(date) = ? AND MONTH(date) = ? ORDER BY created_at DESC";
    db.query(sql, [year, month], callback);
  },

  getByCategory: (category, callback) => {
    const sql = "SELECT * FROM budgetTracker WHERE category = ? ORDER BY created_at DESC";
    db.query(sql, [category], callback);
  },

  update: (id, data, callback) => {
    const { title, amount, description, category, date } = data;
    const sql = `
      UPDATE budgetTracker 
      SET title = ?, amount = ?, description = ?, category = ?, date = ?, updated_at = NOW()
      WHERE id = ?
    `;
    db.query(sql, [title, amount, description, category, date, id], callback);
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM budgetTracker WHERE id = ?";
    db.query(sql, [id], callback);
  },

  getTotalAmount: (callback) => {
    const sql = "SELECT SUM(amount) as total FROM budgetTracker";
    db.query(sql, callback);
  },

  getTotalByCategory: (callback) => {
    const sql = "SELECT category, SUM(amount) as total FROM budgetTracker GROUP BY category";
    db.query(sql, callback);
  }
};

module.exports = Budget;
