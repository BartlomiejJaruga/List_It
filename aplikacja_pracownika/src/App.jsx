import { useState} from 'react';
import './App.css';
import defaultProfilePicture from './assets/default_profile_picture.png';
import dogsEvent from './assets/dogs.jpeg';

function App() {
    const [image, setImage] = useState(defaultProfilePicture);
    const [name, setName] = useState('Jan Kowalski');
    const [description, setDescription] = useState('Lubię jeździć na rowerze po górach. Ulubiony napój to Yerba Mate. Chciałbym zwiedzić USA');
    const [events, setEvents] = useState([
        {
            id: 1,
            name: 'Głaskanie piesków',
            date: new Date().toISOString().slice(0, 10),
            time: '12:15',
            details: 'Głaskanie piesków z pobliskiego schroniska odbędzie się w praku kampusu B. Będzie można oprócz głaskania piesków dowiedzieć się o nich wielu rzeczy. Jeżeli ktoś będzie chętny i zostanie uznany za dobrego opiekuna będzie mógł adoptować pieska do domu.',
            status: 'Zatwierdzone',
            like: 327,
            image: dogsEvent
        }
    ]);
    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        name: '',
        date: new Date().toISOString().slice(0, 10),
        time: '',
        details: ''
    });
    const [formError, setFormError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleEventImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCurrentEvent({ ...currentEvent, image: URL.createObjectURL(e.target.files[0]) }); // Aktualizuj stan bieżącego wydarzenia
        }
    };

    const handleProfileImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0])); // Aktualizuj stan zdjęcia profilowego
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewEvent({ ...newEvent, image: URL.createObjectURL(e.target.files[0]) }); // Aktualizuj stan nowego wydarzenia
        }
    };

    const handleAddEvent = () => {
        if (!newEvent.name || !newEvent.details) {
            setFormError('Pola nazwy wydarzenia i opisu są wymagane!');
            return;
        }
        setEvents([...events, { ...newEvent, id: events.length + 1, status: 'W oczekiwaniu', like: 0 }]);
        setShowPopup(false);
        setNewEvent({ name: '', date: new Date().toISOString().slice(0, 10), time: '', details: '' });
        setFormError('');
    };

    const handleEditEvent = () => {
        const updatedEvents = events.map(event =>
            event.id === currentEvent.id ? { ...currentEvent } : event
        );
        setEvents(updatedEvents);
        setShowEditPopup(false);
        setCurrentEvent(null);
    };

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
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
                    <button>Wyloguj się</button>
                </div>
            </div>
            <div className="main-content">
                {events.map((event) => (
                    <div key={event.id} className="event-card">
                        <div className="event-details">
                            <table className="event-table">
                                <tbody>
                                <tr>
                                    <td className="event-name">Nazwa: {event.name}</td>
                                    <td className="event-date">Data: {event.date} {event.time}</td>
                                    <td className="event-status">Status: {event.status}</td>
                                    <td className="event-like-counter">Like: {event.like}</td>
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
                            <div className="event-body">
                                <p className="event-details-description">{event.details}</p>
                            </div>
                        </div>
                        <div className="event-actions">
                            <button onClick={() => {
                                setCurrentEvent(event);
                                setShowEditPopup(true);
                            }}>Edytuj
                            </button>
                            <button onClick={() => {
                                if (window.confirm("Czy na pewno chcesz usunąć to wydarzenie?")) {
                                    handleDeleteEvent(event.id);
                                }
                            }}>Usuń
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Dodaj nowe wydarzenie</h3>
                        {formError && <p style={{color: 'red'}}>{formError}</p>}
                        <label>Nazwa wydarzenia:</label>
                        <input type="text" value={newEvent.name}
                               onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}/>
                        <label>Data rozpoczęcia:</label>
                        <input type="date" value={newEvent.date}
                               onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}/>
                        <label>Godzina:</label>
                        <input type="time" value={newEvent.time}
                               onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}/>
                        <label>Dodatkowe informacje:</label>
                        <textarea value={newEvent.details}
                                  onChange={(e) => setNewEvent({...newEvent, details: e.target.value})}
                        />
                        <label>Dodaj zdjęcie</label>
                        <input type="file" onChange={handleImageChange} />
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
                        <input type="text" value={currentEvent.name}
                               onChange={(e) => setCurrentEvent({...currentEvent, name: e.target.value})}/>
                        <label>Data rozpoczęcia:</label>
                        <input type="date" value={currentEvent.date}
                               onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}/>
                        <label>Godzina:</label>
                        <input type="time" value={currentEvent.time}
                               onChange={(e) => setCurrentEvent({...currentEvent, time: e.target.value})}/>
                        <label>Dodatkowe informacje:</label>
                        <textarea value={currentEvent.details}
                                  onChange={(e) => setCurrentEvent({...currentEvent, details: e.target.value})}/>
                        <label>Dodaj zdjęcie</label>
                        <input type="file" onChange={handleEventImageChange}/>
                        <button onClick={() => setShowEditPopup(false)}>Wróć</button>
                        <button onClick={handleEditEvent}>Zatwierdź</button>
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

export default App;
