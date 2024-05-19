import React from 'react';
import './EventsTableRow.css';

function EventTableRow({ event, index, isSelected, onCheckboxChange, onStatusChange }) {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onStatusChange(event.id, newStatus);
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{event.name}</td>
      <td>{event.date}</td>
      <td>{event.place}</td>
      <td>{event.description}</td>
      <td>{event.organizer}</td>
      <td>
        <select className='status_cell' value={event.status} onChange={handleStatusChange}>
          <option value="Nowe">Nowe</option>
          <option value="Zaakceptowano">Zaakceptowano</option>
          <option value="Odrzucono">Odrzucono</option>
        </select>
      </td>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onCheckboxChange(event.id)}
        />
      </td>
    </tr>
  );
}

export default EventTableRow;