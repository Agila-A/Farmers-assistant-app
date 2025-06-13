// src/pages/CalendarPage.jsx
import React, { useState } from 'react';
import Calendar from '../Components/Calendar';
import TaskForm from '../Components/TaskForm';
import TaskList from '../Components/TaskList';
import '../styles/Calendar.css';

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const todayDate = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.date === todayDate);

  return (
    <div className="calendar-page-wrapper">
      {/* Banner should be full width at the top */}
      <div className="calendar-banner">
        <div className="banner-inner">
          <span className="banner-icon">🌿</span>
          <span className="banner-title">EVENT SCHEDULING</span>
        </div>
      </div>

      {/* Layout container for calendar and form+task list */}
      <div className="calendar-page">
        <Calendar tasks={tasks} />
        <div className="calendar-right">
          <TaskForm onAddTask={handleAddTask} />
          <TaskList tasks={todayTasks} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
