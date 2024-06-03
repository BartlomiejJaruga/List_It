import React, { useState, useEffect } from 'react';
import '../styles/Notification.css';

const Notification = ({ message, show, onClose, isDarkModeOn }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`notification ${show ? 'notification_show' : ''}`}>
      { isDarkModeOn 
      ? <i className="fa fa-info-circle fa-inverse" aria-hidden="true"></i> 
      : <i className="fa fa-info-circle" aria-hidden="true"></i> }
      <h4>{message}</h4>
    </div>
  );
};

export default Notification;