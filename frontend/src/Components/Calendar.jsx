
import React, { useState } from 'react';
import '../styles/Calendar.css';

const Calendar = ({ tasks }) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const taskMap = {};
  tasks.forEach(task => {
    const date = new Date(task.date);
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      const day = date.getDate();
      if (!taskMap[day]) taskMap[day] = [];
      taskMap[day].push(task);
    }
  });

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="nav-button">←</button>
        {monthNames[currentMonth]} {currentYear}
        <button onClick={handleNextMonth} className="nav-button">→</button>
      </div>

      <div className="calendar-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>

        {/* Empty slots before the first day */}
        {Array(startDay).fill(null).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty"></div>
        ))}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const tasksForDay = taskMap[day] || [];

          return (
            <div className="calendar-day-container" key={day}>
              <div className={`calendar-day ${tasksForDay.length ? 'scheduled' : ''}`}>
                {day}
                {tasksForDay.map((task, index) => (
                  <div className="task-tooltip" key={index}>
                    {task.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
