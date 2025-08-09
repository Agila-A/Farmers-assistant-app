const Budget = require("../models/budgetTracker.model");
const { Op } = require("sequelize");

// ✅ Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { title, description, category, amount, date } = req.body;

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
      date
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

// 📌 Placeholder Controllers for unimplemented routes
exports.getTodayExpenses = (req, res) => {
  res.json({ success: true, message: "getTodayExpenses not implemented yet" });
};

exports.getWeeklyExpenses = (req, res) => {
  res.json({ success: true, message: "getWeeklyExpenses not implemented yet" });
};

exports.getMonthlyExpenses = (req, res) => {
  res.json({ success: true, message: "getMonthlyExpenses not implemented yet" });
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
