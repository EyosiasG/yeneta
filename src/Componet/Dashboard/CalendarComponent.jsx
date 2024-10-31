import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventList from './EventList';
import EventForm from './EventForm';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const editEvent = (event) => {
    const updatedEvents = events.map((e) => (e.id === event.id ? event : e));
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  const deleteEvent = (event) => {
    const filteredEvents = events.filter((e) => e.id !== event.id);
    setEvents(filteredEvents);
    setSelectedEvent(null);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={handleSelectEvent}
        style={{ height: '500px', marginBottom: '20px' }}
      />
      <EventList
        events={events}
        selectedEvent={selectedEvent}
        onEditEvent={editEvent}
        onDeleteEvent={deleteEvent}
      />
      <EventForm
        selectedEvent={selectedEvent}
        onAddEvent={addEvent}
        onEditEvent={editEvent}
      />
    </div>
  );
};

export default CalendarComponent;