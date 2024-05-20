import React, { useState } from 'react';
import ReportsTableHeader from './ReportsTableHeader';
import ReportsTableRow from './ReportsTableRow';
import './ReportsPanel.css';

const initialTickets = [
  { id: 1, date: '15-06-2024', user: '123456', section: 'To-Do List', description: 'Błąd przy dodawaniu zadania', status: 'Nowe' },
  { id: 2, date: '10-07-2024', user: '234567', section: 'Wydarzenia', description: 'Błąd podczas wyświetlania wydarzeń', status: 'W trakcie' },
  { id: 3, date: '05-08-2024', user: '345678', section: 'Logowanie', description: 'Problem z resetowaniem hasła', status: 'Rozwiązano' }
];

function ReportsPanel() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    const valueA = a[sortConfig.key] || '';
    const valueB = b[sortConfig.key] || '';

    if (sortConfig.direction === 'ascending') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  const handleCheckboxChange = (id) => {
    setSelectedTickets((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((ticketId) => ticketId !== id)
        : [...prevSelected, id]
    );
  };

  const handleStatusChange = (id, status) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status } : ticket
    );
    setTickets(updatedTickets);
  };

  return (
    <table>
      <thead>
        <ReportsTableHeader onSort={handleSort} />
      </thead>
      <tbody>
        {sortedTickets.map((ticket, index) => (
          <ReportsTableRow
            key={ticket.id}
            ticket={ticket}
            index={index + 1}
            isSelected={selectedTickets.includes(ticket.id)}
            onCheckboxChange={handleCheckboxChange}
            onStatusChange={handleStatusChange}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ReportsPanel;
