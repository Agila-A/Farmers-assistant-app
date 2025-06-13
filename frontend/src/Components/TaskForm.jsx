import React, { useState } from 'react';
import '../styles/Calendar.css'; // Or use your own stylesheet

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name || !task.date) {
      alert('Please enter task name and date.');
      return;
    }
    onAddTask(task);
    setTask({ name: '', description: '', date: '', time: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label className="form-label">
        <span className="label-title">Task Name</span>
        <input
          type="text"
          name="name"
          className="form-input"
          placeholder="Enter task name"
          value={task.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="form-label">
        <span className="label-title">Date</span>
        <input
          type="date"
          name="date"
          className="form-input"
          value={task.date}
          onChange={handleChange}
          required
        />
      </label>

      <label className="form-label">
        <span className="label-title">Time</span>
        <input
          type="time"
          name="time"
          className="form-input"
          value={task.time}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        <span className="label-title">Task Description</span>
        <textarea
          name="description"
          className="form-textarea"
          placeholder="Describe your task"
          value={task.description}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className="add-task-button">Add Task</button>
    </form>
  );
};

export default TaskForm;
