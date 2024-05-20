import React from 'react';
import './ReportsTableHeader.css';

function ReportsTableHeader({ onSort }) {
  const handleSort = (key) => {
    onSort(key);
  };

  return (
    <tr>
      <th>LP</th>
      <th onClick={() => handleSort('date')}>Data</th>
      <th onClick={() => handleSort('user')}>Użytkownik</th>
      <th onClick={() => handleSort('section')}>Sekcja</th>
      <th onClick={() => handleSort('description')}>Opis</th>
      <th onClick={() => handleSort('status')}>Status</th>
      <th>Usuń</th>
    </tr>
  );
}

export default ReportsTableHeader;