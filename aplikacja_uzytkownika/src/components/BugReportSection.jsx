import { useState } from 'react';
import Notification from './Notification';
import '../styles/BugReportSection.css';

function BugReportSection({ isDarkMode }){

    const [section, setSection] = useState('to-do_list');
    const [description, setDescription] = useState('');
    const [consent, setConsent] = useState(false);
    const [error, setError] = useState('');
    const [ showNotification, setShowNotification ] = useState(false);

    const handleSubmit = () => {
        if (section.trim() !== '' && description.trim() !== '' && consent) {
            setError('');
            setShowNotification(true);
            setSection('to-do_list');
            setDescription('');
            setConsent(false);
        } else {
            setError('Wszystkie pola są wymagane.');
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    };

    function setCloseNotificationHandler(){
        setShowNotification(false);
    }

    return (
        <div className="bug-report-section">
            <label className={"section-label"}>
                Sekcja:<br/>
                <select value={section} onChange={(e) => setSection(e.target.value)}>
                    <option value="log_in">Logowanie</option>
                    <option value="to-do_list">To-Do List</option>
                    <option value="events">Wydarzenia</option>
                    <option value="menu_bar">Pasek Menu</option>
                </select>
            </label><br/>
            <label className={"description-label"}>
                Opis błędu:<br/>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Opis napotkanego błędu"
                />
            </label>
            <label className="approval-label">
                <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                />
                <span>Zgoda na wysyłanie danych o urządzeniu na którym wystąpił błąd</span>
            </label>
            <br/><br/>
            <button className="send-button" onClick={handleSubmit}>Wyślij zgłoszenie</button>
            {error && <p className="error-message">{error}</p>}
            <Notification message="Zgłoszenie zostało wysłane." 
                                             show={showNotification} 
                                             onClose={setCloseNotificationHandler}
                                             isDarkModeOn={isDarkMode} />
        </div>
    );
}

export default BugReportSection;