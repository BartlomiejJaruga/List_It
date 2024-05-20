import React, { useState } from 'react';
import EventsTableHeader from './EventsTableHeader';
import EventsTableRow from './EventsTableRow';

const initialEvents = [
  { id: 1, name: 'Konferencja Naukowa', date: '15-06-2024', place: 'Centrum Konferencyjne', description: 'Konferencja na temat nowych technologii', organizer: 'Uniwersytet XYZ', status: 'Nowe' },
  { id: 2, name: 'Warsztaty Programowania', date: '10-07-2024', place: 'Sala Komputerowa A1', description: 'Warsztaty dla początkujących programistów', organizer: 'Klub Programistyczny ABC', status: 'Zaakceptowano' },
  { id: 3, name: 'Spotkanie Integracyjne', date: '05-08-2024', place: 'Park miejski', description: 'Spotkanie dla studentów i pracowników uczelni', organizer: 'Biuro Integracji Studenckiej', status: 'Nowe' }
];

function EventsPanel() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedEvents = [...events].sort((a, b) => {
    const valueA = a[sortConfig.key] || '';
    const valueB = b[sortConfig.key] || '';
  
    if (sortConfig.direction === 'ascending') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  const handleCheckboxChange = (id) => {
    setSelectedEvents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((eventId) => eventId !== id)
        : [...prevSelected, id]
    );
  };

  const handleStatusChange = (id, status) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, status } : event
    );
    setEvents(updatedEvents);
  };

  return (
    <table>
      <thead>
        <EventsTableHeader onSort={handleSort} />
      </thead>
      <tbody>
        {sortedEvents.map((event, index) => (
          <EventsTableRow
            key={event.id}
            event={event}
            index={index + 1} // Index is calculated from the sorted list
            isSelected={selectedEvents.includes(event.id)}
            onCheckboxChange={handleCheckboxChange}
            onStatusChange={handleStatusChange}
          />
        ))}
      </tbody>
    </table>
  );
}

export default EventsPanel;