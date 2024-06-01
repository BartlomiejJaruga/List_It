import { useState } from 'react';
import '../styles/BugReportSection.css';

function BugReportSection(){

    const [section, setSection] = useState('todo');
    const [description, setDescription] = useState('');
    const [consent, setConsent] = useState(false);

    const handleSubmit = () => {
        if (description.trim() !== '') {
            alert('Error reported successfully!');
            setSection('todo');
            setDescription('');
            setConsent(false);
        } else {
            alert('Please enter a description of the error.');
        }
    };


    return (
        <div className="bug-report-section">
            <label>
                Sekcja:
                <select value={section} onChange={(e) => setSection(e.target.value)}>
                    <option value="log_in">Logowanie</option>
                    <option value="to-do_list">To-Do List</option>
                    <option value="events">Wydarzenia</option>
                    <option value="menu_bar">Pasek Menu</option>
                </select>
            </label>
            <br/>
            <label>
                Opis błędu:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Wpisz opis napotkanego błędu"
                />
            </label>
            <br/>
            <label>
                <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                />
                Zgoda na wysyłanie danych o urządzeniu na którym wystąpił błąd
            </label>
            <br/>
            <button onClick={handleSubmit}>Wyślij zgłoszenie</button>
        </div>
    );
}

export default BugReportSection;