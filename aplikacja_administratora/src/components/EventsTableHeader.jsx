// EventsTableHeader component update
import React from 'react';
import './EventsTableHeader.css';

function EventsTableHeader({ onSort }) {
    const handleSort = (key) => {
        onSort(key);
    };

    return (
        <tr>
            <th>ID</th>
            <th onClick={() => handleSort('name')}>Nazwa</th>
            <th onClick={() => handleSort('date')}>Data</th>
            <th onClick={() => handleSort('time')}>Godzina</th>
            <th onClick={() => handleSort('description')}>Opis</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th>Usuń</th>
        </tr>
    );
}

export default EventsTableHeader;
