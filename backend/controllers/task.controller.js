const Task = require('../models/task.model');

exports.getAllTasks = async (req, res) => {
  try {
    const { date } = req.query;
    let tasks;
    if (date) {
      tasks = await Task.findAll({ where: { date }, order: [['time', 'ASC']] });
    } else {
      tasks = await Task.findAll({ order: [['date', 'ASC'], ['time', 'ASC']] });
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { name, description, date, time } = req.body;
    if (!name || !date) return res.status(400).json({ error: 'Name and date are required' });
    const newTask = await Task.create({ name, description, date, time });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { name, description, date, time } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    await task.update({ name, description, date, time });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    await task.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}; 