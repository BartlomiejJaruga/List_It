import React from 'react';
import './EventsTableRow.css';

function EventsTableRow({ event, onCheckboxChange, onStatusChange }) {
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        onStatusChange(event.id, newStatus);
    };

    return (
        <tr>
            <td>{event.id}</td>
            <td>{event.name}</td>
            <td>{event.date}</td>
            <td>{event.time}</td>
            <td>{event.description}</td>
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
                    checked={event.isSelected}
                    onChange={() => onCheckboxChange(event.id)}
                />
            </td>
        </tr>
    );
}

export default EventsTableRow;
