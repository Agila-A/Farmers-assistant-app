import React, { useState } from 'react';
import '../styles/Calendar.css';

const TaskList = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState(Array(tasks.length).fill(false));

  const toggleCompleted = (index) => {
    const updated = [...completedTasks];
    updated[index] = !updated[index];
    setCompletedTasks(updated);
  };

  return (
    <div className="task-list">
      <h3>Today Task ({tasks.length})</h3>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{ opacity: completedTasks[index] ? 0.6 : 1 }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={completedTasks[index]}
                onChange={() => toggleCompleted(index)}
              />
              <strong>{task.name}</strong>
            </label>
            <div>🕒 {task.time}</div>
            <div>📝 {task.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
