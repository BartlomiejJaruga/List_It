import React, { useState, useEffect } from 'react';
import EventsTableHeader from './EventsTableHeader';
import EventsTableRow from './EventsTableRow';

function EventsPanel() {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/event', {
          credentials: 'include', // Assuming sessions are used
        });
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedEvents = events.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
      <div className="events_panel">
        <table className="events_table">
          <thead>
          <EventsTableHeader onSort={handleSort} />
          </thead>
          <tbody>
          {sortedEvents.map(event => (
              <EventsTableRow
                  key={event.id}
                  event={event}
                  onCheckboxChange={(id) => {
                    setSelectedEvents(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
                  }}
                  onStatusChange={(id, status) => {
                    const updatedEvents = events.map(e => e.id === id ? { ...e, status } : e);
                    setEvents(updatedEvents);
                  }}
              />
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default EventsPanel;