import React, { useState } from 'react';
import './UserProfile.css';
import defaultPhoto from '../assets/default_user_picture.jpg';

function UserProfile() {
  const [photo, setPhoto] = useState(defaultPhoto);

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
        <img src={photo} alt="admin photo" id="user_photo" />
        <div className="user_profile_buttons">
          <button id="user_profile_add_photo_btn" onClick={() => document.getElementById('fileInput').click()}>Dodaj zdjęcie</button>
          <button id="user_profile_remove_photo_btn" onClick={removePhoto}>Usuń zdjęcie</button>
          <input type="file" id="fileInput" style={{ display: 'none' }} accept="image/*" onChange={loadPhoto} />
        </div>
      </div>
      <div className="user_info">
        <p>Krzysztof Kowalski</p>
        <p>Administrator</p>
      </div>
    </div>
  );
}

export default UserProfile;