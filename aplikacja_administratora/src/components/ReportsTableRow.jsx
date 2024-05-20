import React from 'react';

function ReportsTableRow({ ticket, index, isSelected, onCheckboxChange, onStatusChange }) {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onStatusChange(ticket.id, newStatus);
  };

  return (
    <tr className={isSelected ? 'selected' : ''}>
      <td>{index}</td>
      <td>{ticket.date}</td>
      <td>{ticket.user}</td>
      <td>{ticket.section}</td>
      <td>{ticket.description}</td>
      <td>
        <select className='status_cell' value={ticket.status} onChange={handleStatusChange}>
          <option value="Nowe">Nowe</option>
          <option value="W trakcie">W trakcie</option>
          <option value="Rozwiązano">Rozwiązano</option>
        </select>
      </td>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onCheckboxChange(ticket.id)}
        />
      </td>
    </tr>
  );
}

export default ReportsTableRow;
