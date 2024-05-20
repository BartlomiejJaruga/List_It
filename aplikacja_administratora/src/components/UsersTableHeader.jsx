import React from 'react';
import './UsersTableHeader.css';

function UsersTableHeader({ onSort }) {
  return (
    <tr>
      <th>LP</th>
      <th onClick={() => onSort('index')}>Indeks</th>
      <th onClick={() => onSort('firstName')}>Imie</th>
      <th onClick={() => onSort('lastName')}>Nazwisko</th>
      <th onClick={() => onSort('faculty')}>Wydział</th>
      <th onClick={() => onSort('course')}>Kierunek</th>
      <th onClick={() => onSort('year')}>Rok</th>
      <th onClick={() => onSort('semester')}>Semestr</th>
      <th>Usuń</th>
    </tr>
  );
}

export default UsersTableHeader;
