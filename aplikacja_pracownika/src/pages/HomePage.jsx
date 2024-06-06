import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import defaultProfilePicture from '../assets/default_profile_picture.png';
import dogsEvent from '../assets/event.png';

function HomePage() {
    const [image, setImage] = useState(defaultProfilePicture);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [creatorId, setCreatorId] = useState(null);
    const [events, setEvents] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showEditUserInfoPopup, setShowEditUserInfoPopup] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        name: '',
        date: new Date().toISOString().slice(0, 10),
        time: '',
        description: ''
    });
    const [formError, setFormError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/user', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const user = await response.json();
                    setName(user.fullName);
                    setDescription(user.description || '');
                    setCreatorId(user.id);
                    if (user.profilePicture) {
                        setImage(user.profilePicture);
                    }
                    fetchUserEvents(user.id); // Fetch events after setting user id
                } else {
                    console.error('Failed to fetch user data');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/');
            }
        };

        const fetchUserEvents = async (userId) => {
            try {
                const response = await fetch(`http://localhost:8081/api/event/user/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const userEvents = await response.json();
                    console.log('Fetched events:', userEvents); // Log fetched events
                    const eventsWithImage = userEvents.map(event => ({ ...event, image: dogsEvent }));
                    setEvents(eventsWithImage);
                } else {
                    console.error('Failed to fetch events');
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleEventImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCurrentEvent({ ...currentEvent, image: URL.createObjectURL(e.target.files[0]) });
        }
    };

    const handleProfileImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleAddEvent = async () => {
        if (!newEvent.name || !newEvent.description) {
            setFormError('Pola nazwy wydarzenia i opisu są wymagane!');
            return;
        }

        const eventToCreate = { ...newEvent, creatorId };

        try {
            const response = await fetch('http://localhost:8081/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventToCreate),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get response text for debugging
                console.error('Error response text:', errorText); // Log the error text
                throw new Error('Failed to add event');
            }

            const addedEvent = await response.json();
            console.log('Added event:', addedEvent); // Log the added event
            setEvents([...events, { ...addedEvent, image: dogsEvent }]);
            setShowPopup(false);
            setNewEvent({ name: '', date: new Date().toISOString().slice(0, 10), time: '', description: '' });
            setFormError('');
        } catch (error) {
            console.error('Error adding event:', error);
            setFormError('Failed to add event');
        }
    };

    const handleSaveEditEvent = async () => {
        if (!currentEvent.name || !currentEvent.description) {
            setFormError('Pola nazwy wydarzenia i opisu są wymagane!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/event/${currentEvent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentEvent),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get response text for debugging
                console.error('Error response text:', errorText); // Log the error text
                throw new Error('Failed to edit event');
            }

            const updatedEvent = await response.json();
            console.log('Updated event:', updatedEvent); // Log the updated event
            const updatedEvents = events.map(event =>
                event.id === updatedEvent.id ? updatedEvent : event
            );
            setEvents(updatedEvents);
            setShowEditPopup(false);
            setCurrentEvent(null);
            setFormError('');
        } catch (error) {
            console.error('Error editing event:', error);
            setFormError('Failed to edit event');
        }
    };

    const handleSaveUserInfo = async () => {
        if (!description) {
            setFormError('Opis nie może być pusty!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/user/${creatorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get response text for debugging
                console.error('Error response text:', errorText); // Log the error text
                throw new Error('Failed to edit user info');
            }

            const updatedUser = await response.json();
            console.log('Updated user:', updatedUser); // Log the updated user info
            setDescription(updatedUser.description);
            setShowEditUserInfoPopup(false);
            setFormError('');
        } catch (error) {
            console.error('Error editing user info:', error);
            setFormError('Failed to edit user info');
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/api/event/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get response text for debugging
                console.error('Error response text:', errorText); // Log the error text
                throw new Error('Failed to delete event');
            }

            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate('/');
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="profile">
                    <div className="image-upload">
                        {image && <img src={image} alt="Profile" className="profile-img" />}
                        <input type="file" onChange={handleProfileImageChange} />
                    </div>

                    <label>Imię i nazwisko:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>O tobie:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={13} />

                    <button onClick={() => setShowPopup(true)}>Dodaj wydarzenie</button>
                    <button onClick={() => setShowEditUserInfoPopup(true)}>Edytuj informacje</button>
                    <button onClick={handleLogout}>Wyloguj się</button>
                </div>
            </div>
            <div className="main-content">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="event-card">
                            <div className="event-details">
                                <table className="event-table">
                                    <tbody>
                                    <tr>
                                        <td>Nazwa: {event.name}</td>
                                        <td>Data: {event.date} {event.time}</td>
                                        <td>Status: {event.status}</td>
                                        <td>Likes: {event.likes}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                {event.image && (
                                    <img
                                        src={event.image}
                                        alt="Obrazek wydarzenia"
                                        className="event-img"
                                        onClick={() => setSelectedImage(event.image)}
                                    />
                                )}
                                <p>{event.description}</p>
                                <div className="event-actions">
                                    <button onClick={() => { setCurrentEvent(event); setShowEditPopup(true); }}>Edytuj</button>
                                    <button onClick={() => {
                                        if (window.confirm("Czy na pewno chcesz usunąć to wydarzenie?")) {
                                            handleDeleteEvent(event.id);
                                        }
                                    }}>Usuń</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no_events_info">Brak wydarzeń do wyświetlenia.</p>
                )}
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Dodaj nowe wydarzenie</h3>
                        {formError && <p style={{ color: 'red' }}>{formError}</p>}

                        <label>Nazwa wydarzenia:</label>
                        <input
                            type="text"
                            value={newEvent.name}
                            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        />

                        <label>Data rozpoczęcia:</label>
                        <input
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        />

                        <label>Godzina:</label>
                        <input
                            type="time"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        />

                        <label>Dodatkowe informacje:</label>
                        <textarea
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        />

                        <button onClick={() => setShowPopup(false)}>Wróć</button>
                        <button onClick={handleAddEvent}>Zatwierdź</button>
                    </div>
                </div>
            )}
            {showEditPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Edytuj wydarzenie</h3>
                        <label>Nazwa wydarzenia:</label>
                        <input
                            type="text"
                            value={currentEvent.name}
                            onChange={(e) => setCurrentEvent({ ...currentEvent, name: e.target.value })}
                        />

                        <label>Data rozpoczęcia:</label>
                        <input
                            type="date"
                            value={currentEvent.date}
                            onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                        />

                        <label>Godzina:</label>
                        <input
                            type="time"
                            value={currentEvent.time}
                            onChange={(e) => setCurrentEvent({ ...currentEvent, time: e.target.value })}
                        />

                        <label>Dodatkowe informacje:</label>
                        <textarea
                            value={currentEvent.description}
                            onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                        />

                        <button onClick={() => setShowEditPopup(false)}>Wróć</button>
                        <button onClick={handleSaveEditEvent}>Zatwierdź</button>
                    </div>
                </div>
            )}
            {showEditUserInfoPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Edytuj informacje</h3>
                        {formError && <p style={{ color: 'red' }}>{formError}</p>}

                        <label>Opis:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button onClick={() => setShowEditUserInfoPopup(false)}>Wróć</button>
                        <button onClick={handleSaveUserInfo}>Zatwierdź</button>
                    </div>
                </div>
            )}
            {selectedImage && (
                <div className="popup" onClick={() => setSelectedImage(null)}>
                    <div className="popup-content">
                        <img src={selectedImage} alt="Powiększone zdjęcie" className="expanded-image" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
