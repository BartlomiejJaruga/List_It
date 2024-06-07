import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import defaultPhoto from '../assets/default_user_picture.jpg';

function UserProfile() {
  const [user, setUser] = useState({
    id: null,
    name: 'Loading...',
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
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser({
        id: userData.id,
        name: userData.fullName,
        role: userData.type
      });
      if (userData.profilePicture) {
        fetchProfilePicture(userData.id);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser({
        name: 'Error fetching data',
        role: ''
      });
    }
  };

  const fetchProfilePicture = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/user/${userId}/profile-picture`, {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setPhoto(imageObjectURL);
      } else {
        console.error('Failed to fetch profile picture');
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

  const handleProfileImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`http://localhost:8081/api/user/${user.id}/profile-picture`, {
          method: 'PUT',
          body: formData,
          credentials: 'include',
        });

        if (!response.ok) {
          const errorText = await response.text(); // Get response text for debugging
          console.error('Error response text:', errorText); // Log the error text
          throw new Error('Failed to upload profile picture');
        }

        setPhoto(URL.createObjectURL(file));
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  return (
      <div>
        <div className="photo_and_buttons">
          <img src={photo} alt="user photo" id="user_photo" onClick={() => document.getElementById('fileInput').click()} />
          <input type="file" id="fileInput" style={{ display: 'none' }} accept="image/*" onChange={handleProfileImageChange} />
        </div>
        <div className="user_info">
          <p>{user.name}</p>
          <p>{user.role}</p>
        </div>
      </div>
  );
}

export default UserProfile;
