import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you can also add any logout logic, like clearing tokens or user data
    navigate('/');
  };

  return (
      <button className="logout-button" onClick={handleLogout}>Wyloguj się</button>
  );
}

export default LogoutButton;
