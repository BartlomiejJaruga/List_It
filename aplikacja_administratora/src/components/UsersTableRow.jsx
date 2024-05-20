import React from 'react';

function UsersTableRow({ user, index, isSelected, onCheckboxChange }) {
  return (
    <tr>
      <td>{index}</td>
      <td>{user.index}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.faculty}</td>
      <td>{user.course}</td>
      <td>{user.year}</td>
      <td>{user.semester}</td>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onCheckboxChange(user.id)}
        />
      </td>
    </tr>
  );
}

export default UsersTableRow;
