import { useState } from 'react';
import '../styles/BugReportSection.css';

function BugReportSection(){

    const [section, setSection] = useState('todo');
    const [description, setDescription] = useState('');
    const [consent, setConsent] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = () => {
        if (section.trim() !== '' && description.trim() !== '' && consent) {
            setError('');
            setSuccessMessage('Zgłoszenie wysłane pomyślnie!');
            setSection('todo');
            setDescription('');
            setConsent(false);
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        } else {
            setError('Wszystkie pola są wymagane.');
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    };

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
                    placeholder="Wpisz opis napotkanego błędu"
                />
            </label>
            <label className={"approval-label"}>
                <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                />
                Zgoda na wysyłanie danych o urządzeniu na którym wystąpił błąd
            </label>
            <br/><br/>
            <button className="send-button" onClick={handleSubmit}>Wyślij zgłoszenie</button>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}

export default BugReportSection;