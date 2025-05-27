// src/pages/CalendarPage.jsx
import React, { useState } from 'react';
import Calendar from '../components/Calendar';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: '', task: '' });

  const handleAddEvent = () => {
    if (newEvent.date && newEvent.task) {
      setEvents([...events, newEvent]);
      setNewEvent({ date: '', task: '' });
    }
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <Calendar
      events={events}
      newEvent={newEvent}
      setNewEvent={setNewEvent}
      handleAddEvent={handleAddEvent}
      handleDeleteEvent={handleDeleteEvent}
    />
  );
};

export default CalendarPage;
