import '../styles/SectionNameHeader.css';

function SectionNameHeader({ currentSection }){
    return(
        <div className='section_name_header'>
            <h1>
                {currentSection === "ToDo_List" ? "To-Do List"
                : currentSection === "Events" ? "Wydarzenia"
                : currentSection === "Settings" ? "Ustawienia" 
                : "Zgłoś Błąd"}
            </h1>
        </div>
    );
}

export default SectionNameHeader;