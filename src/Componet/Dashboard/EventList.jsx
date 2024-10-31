import React from 'react';

const EventList = ({ events, selectedEvent, onEditEvent, onDeleteEvent }) => {
  return (
    <div>
      <h2>Event List</h2>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              className={selectedEvent && selectedEvent.id === event.id ? 'selected' : ''}
            >
              <span>{event.title}</span>
              <button onClick={() => onEditEvent(event)}>Edit</button>
              <button onClick={() => onDeleteEvent(event)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;