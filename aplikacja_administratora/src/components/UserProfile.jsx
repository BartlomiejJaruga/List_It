import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import defaultPhoto from '../assets/default_user_picture.jpg';

function UserProfile() {
  const [user, setUser] = useState({
    name: 'Loading...', // default name while loading
    role: ''
  });
  const [photo, setPhoto] = useState(defaultPhoto);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/user', {
        method: 'GET',
        credentials: 'include', // to ensure cookies are sent to handle session
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser({
        name: userData.fullName,
        role: userData.type // assuming type is used for the role
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser({
        name: 'Error fetching data',
        role: ''
      });
    }
  };

  const loadPhoto = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    event.target.value = null;
  };

  const removePhoto = () => {
    setPhoto(defaultPhoto);
  };

  return (
      <div>
        <div className="photo_and_buttons">
          <img src={photo} alt="user photo" id="user_photo" />
          <div className="user_profile_buttons">
            <button onClick={() => document.getElementById('fileInput').click()}>Add Photo</button>
            <button onClick={removePhoto}>Remove Photo</button>
            <input type="file" id="fileInput" style={{ display: 'none' }} accept="image/*" onChange={loadPhoto} />
          </div>
        </div>
        <div className="user_info">
          <p>{user.name}</p>
          <p>{user.role}</p>
        </div>
      </div>
  );
}

export default UserProfile;
