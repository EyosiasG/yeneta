import React, { useState, useEffect } from 'react';

const EventForm = ({ selectedEvent, onAddEvent, onEditEvent }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
    } else {
      setTitle('');
    }
  }, [selectedEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      title,
    };

    if (selectedEvent) {
      onEditEvent(event);
    } else {
      onAddEvent(event);
    }

    setTitle('');
  };

  return (
    <div>
      <h2>{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">{selectedEvent ? 'Save' : 'Add'}</button>
      </form>
    </div>
  );
};

export default EventForm;