const Budget = require("../models/budgetTracker.model");
const { Op } = require("sequelize");
const moment = require('moment');

// ✅ Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { title, description, category, amount, date } = req.body;
    const receipt_url = req.file ? req.file.path : null;

    if (!title || !category || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, category, amount, and date"
      });
    }

    const newExpense = await Budget.create({
      title,
      description,
      category,
      amount,
      date,
      receipt_url
    });

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save expense",
      error: error.message
    });
  }
};

// ✅ Get All Expenses (with filters)
exports.getAllExpenses = async (req, res) => {
  try {
    const { search, category, startDate, endDate, minAmount, maxAmount } = req.query;
    let whereClause = {};

    if (search) {
      whereClause.description = { [Op.like]: `%${search}%` };
    }

    if (category) {
      whereClause.category = category;
    }

    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date[Op.gte] = startDate;
      if (endDate) whereClause.date[Op.lte] = endDate;
    }

    if (minAmount || maxAmount) {
      whereClause.amount = {};
      if (minAmount) whereClause.amount[Op.gte] = parseFloat(minAmount);
      if (maxAmount) whereClause.amount[Op.lte] = parseFloat(maxAmount);
    }

    const expenses = await Budget.findAll({
      where: whereClause,
      order: [["date", "DESC"]]
    });

    res.json({
      success: true,
      data: expenses,
      count: expenses.length
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
      error: error.message
    });
  }
};

// ✅ Update Expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, amount, date } = req.body;

    const expense = await Budget.findByPk(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    await expense.update({
      title,
      description,
      category,
      amount,
      date
    });

    res.json({
      success: true,
      message: "Expense updated successfully",
      data: expense
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update expense",
      error: error.message
    });
  }
};

// ✅ Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Budget.findByPk(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    await expense.destroy();
    res.json({
      success: true,
      message: "Expense deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete expense",
      error: error.message
    });
  }
};

// ✅ Get Today's Expenses
exports.getTodayExpenses = async (req, res) => {
  try {
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    const expenses = await Budget.findAll({
      where: {
        date: {
          [Op.gte]: startOfDay,
          [Op.lte]: endOfDay,
        }
      },
      order: [["date", "DESC"]]
    });
    res.json({ success: true, data: expenses, count: expenses.length });
  } catch (error) {
    console.error("Error fetching today's expenses:", error);
    res.status(500).json({ success: false, message: "Failed to fetch today's expenses", error: error.message });
  }
};

// ✅ Get Weekly Expenses
exports.getWeeklyExpenses = async (req, res) => {
  try {
    const startOfWeek = moment().startOf('week').toDate();
    const endOfWeek = moment().endOf('week').toDate();

    const expenses = await Budget.findAll({
      where: {
        date: {
          [Op.gte]: startOfWeek,
          [Op.lte]: endOfWeek,
        }
      },
      order: [["date", "DESC"]]
    });
    res.json({ success: true, data: expenses, count: expenses.length });
  } catch (error) {
    console.error("Error fetching weekly expenses:", error);
    res.status(500).json({ success: false, message: "Failed to fetch weekly expenses", error: error.message });
  }
};

// ✅ Get Monthly Expenses
exports.getMonthlyExpenses = async (req, res) => {
  try {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    const expenses = await Budget.findAll({
      where: {
        date: {
          [Op.gte]: startOfMonth,
          [Op.lte]: endOfMonth,
        }
      },
      order: [["date", "DESC"]]
    });
    res.json({ success: true, data: expenses, count: expenses.length });
  } catch (error) {
    console.error("Error fetching monthly expenses:", error);
    res.status(500).json({ success: false, message: "Failed to fetch monthly expenses", error: error.message });
  }
};

exports.getExpensesByDate = (req, res) => {
  res.json({ success: true, message: "getExpensesByDate not implemented yet" });
};

exports.getExpensesByWeek = (req, res) => {
  res.json({ success: true, message: "getExpensesByWeek not implemented yet" });
};

exports.getExpensesByMonth = (req, res) => {
  res.json({ success: true, message: "getExpensesByMonth not implemented yet" });
};

exports.getExpensesByCategory = (req, res) => {
  res.json({ success: true, message: "getExpensesByCategory not implemented yet" });
};

exports.getTotalAmount = (req, res) => {
  res.json({ success: true, message: "getTotalAmount not implemented yet" });
};

exports.getTotalByCategory = (req, res) => {
  res.json({ success: true, message: "getTotalByCategory not implemented yet" });
};