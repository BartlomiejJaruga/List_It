import React, { useState } from 'react';

import './UsersPanel.css';
import UsersTableHeader from './UsersTableHeader';
import UsersTableRow from './UsersTableRow';

const initialUsers = [
  { id: 1, index: '12345', firstName: 'Jan', lastName: 'Kowalski', faculty: 'Wydział A', course: 'Informatyka', year: 1, semester: 1 },
  { id: 2, index: '67890', firstName: 'Anna', lastName: 'Nowak', faculty: 'Wydział B', course: 'Matematyka', year: 2, semester: 3 },
  { id: 3, index: '23456', firstName: 'Adam', lastName: 'Wiśniewski', faculty: 'Wydział C', course: 'Fizyka', year: 1, semester: 1 },
  { id: 4, index: '34567', firstName: 'Ewa', lastName: 'Kowalczyk', faculty: 'Wydział D', course: 'Chemia', year: 2, semester: 3 },
  { id: 5, index: '45678', firstName: 'Marek', lastName: 'Lewandowski', faculty: 'Wydział E', course: 'Biologia', year: 3, semester: 5 },
  { id: 6, index: '56789', firstName: 'Karolina', lastName: 'Zielińska', faculty: 'Wydział F', course: 'Matematyka', year: 4, semester: 7 },
  { id: 7, index: '67891', firstName: 'Piotr', lastName: 'Kaczmarek', faculty: 'Wydział G', course: 'Informatyka', year: 1, semester: 2 },
  { id: 8, index: '78901', firstName: 'Magdalena', lastName: 'Dąbrowska', faculty: 'Wydział H', course: 'Filozofia', year: 2, semester: 4 },
  { id: 9, index: '89012', firstName: 'Tomasz', lastName: 'Wojciechowski', faculty: 'Wydział I', course: 'Psychologia', year: 3, semester: 6 },
  { id: 10, index: '90123', firstName: 'Joanna', lastName: 'Kubiak', faculty: 'Wydział J', course: 'Socjologia', year: 4, semester: 8 },
  { id: 11, index: '01234', firstName: 'Rafał', lastName: 'Michalski', faculty: 'Wydział K', course: 'Ekonomia', year: 1, semester: 1 },
  { id: 12, index: '12346', firstName: 'Paulina', lastName: 'Sikora', faculty: 'Wydział L', course: 'Prawo', year: 2, semester: 3 },
  { id: 13, index: '23457', firstName: 'Krzysztof', lastName: 'Lis', faculty: 'Wydział M', course: 'Historia', year: 3, semester: 5 },
  { id: 14, index: '34568', firstName: 'Monika', lastName: 'Wysocka', faculty: 'Wydział N', course: 'Geografia', year: 4, semester: 7 },
  { id: 15, index: '45679', firstName: 'Michał', lastName: 'Borkowski', faculty: 'Wydział O', course: 'Inżynieria', year: 1, semester: 2 },
  { id: 16, index: '56780', firstName: 'Sylwia', lastName: 'Wróbel', faculty: 'Wydział P', course: 'Pedagogika', year: 2, semester: 4 },
  { id: 17, index: '67892', firstName: 'Marcin', lastName: 'Nowacki', faculty: 'Wydział Q', course: 'Politologia', year: 3, semester: 6 },
  { id: 18, index: '78902', firstName: 'Aleksandra', lastName: 'Jankowska', faculty: 'Wydział R', course: 'Lingwistyka', year: 4, semester: 8 },
  { id: 19, index: '89013', firstName: 'Paweł', lastName: 'Baran', faculty: 'Wydział S', course: 'Informatyka', year: 1, semester: 1 },
  { id: 20, index: '90124', firstName: 'Zuzanna', lastName: 'Czarnecka', faculty: 'Wydział T', course: 'Fizyka', year: 2, semester: 3 },
  { id: 21, index: '01235', firstName: 'Grzegorz', lastName: 'Pietrzak', faculty: 'Wydział U', course: 'Chemia', year: 3, semester: 5 },
  { id: 22, index: '12347', firstName: 'Natalia', lastName: 'Wawrzyniak', faculty: 'Wydział V', course: 'Biologia', year: 4, semester: 7 }
];

function UsersPanel() {
  const [users, setUsers] = useState(initialUsers);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className='users_panel'>
        <table>
            <thead>
                <UsersTableHeader onSort={handleSort} />
            </thead>
            <tbody>
                {sortedUsers.map((user, index) => (
                <UsersTableRow
                    key={user.id}
                    user={user}
                    index={index + 1}
                    isSelected={selectedUsers.includes(user.id)}
                    onCheckboxChange={handleCheckboxChange}
                />
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default UsersPanel;
