import React from 'react';
import './EventsTableHeader.css';

function EventsTableHeader({ onSort }) {
    const handleSort = (key) => {
        onSort(key);
    };

    return (
        <tr>
            <th id="events_table_ID">ID</th>
            <th id="events_table_name" onClick={() => handleSort('name')}>Nazwa</th>
            <th id="events_table_date" onClick={() => handleSort('date')}>Data</th>
            <th id="events_table_time" onClick={() => handleSort('time')}>Godzina</th>
            <th id="events_table_place" onClick={() => handleSort('place')}>Miejsce</th>
            <th id="events_table_description" onClick={() => handleSort('description')}>Opis</th>
            <th id="events_table_status" onClick={() => handleSort('status')}>Status</th>
            <th id="events_table_delete">Usuń</th>
        </tr>
    );
}

export default EventsTableHeader;
