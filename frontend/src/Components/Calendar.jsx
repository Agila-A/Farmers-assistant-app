// src/components/Calendar.jsx
import React from 'react';
import '../styles/Calendar.css';

const Calendar = ({
  events,
  newEvent,
  setNewEvent,
  handleAddEvent,
  handleDeleteEvent,
}) => {
  return (
    <div className="calendar-container">
      {/* Banner Section */}
      <div className="banner-section">
        <h1>From sowing seeds to harvest's cheer!!!</h1>
        <p>Stay on track throughout the year</p>
      </div>

      {/* Calendar and Schedule Section */}
      <div className="schedule-container">
        {/* Left Calendar */}
        <div className="left-calendar">
          <h3>March</h3>
          <div className="calendar">
            <div className="week">
              <span>Mon</span><span>Tue</span><span>Wed</span>
              <span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
            <div className="days">
              <button>24</button>
              <button>25</button>
              <button className="selected">26</button>
              <button>27</button>
              <button>28</button>
            </div>
          </div>
          <button className="your-schedule-btn">Your Schedule</button>
        </div>

        {/* Right Form Section */}
        <div className="right-form">
          <h3>Wednesday, 26th</h3>
          <div className="tasks">
            <button>Watering the plants</button>
            <button>Buying fertilizer</button>
          </div>

          <div className="add-event-section">
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <input
              type="text"
              value={newEvent.task}
              onChange={(e) => setNewEvent({ ...newEvent, task: e.target.value })}
              placeholder="Task Description"
            />
            <button className="add-btn" onClick={handleAddEvent}>Add Event</button>
          </div>

          {/* Display added events */}
          <ul>
            {events.map((event, index) => (
              <li key={index} className="event-item">
                <strong>{event.date}</strong>: {event.task}
                <button className="delete-btn" onClick={() => handleDeleteEvent(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
