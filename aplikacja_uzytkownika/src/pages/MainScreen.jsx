import { useState } from 'react';

import '../styles/MainScreen.css';
import AppTopHeader from '../components/AppTopHeader';
import ToDoListSection from '../components/ToDoListSection';
import EventsSection from '../components/EventsSection';
import SettingsSection from '../components/SettingSection';
import BugReportSection from '../components/BugReportSection';


function MainScreen(){
    const [ sectionName, changeSection ] = useState("ToDo_List");
    const [ isHamburgerMenuOpen, changeHamburgerMenuState ] = useState(false);
    const toggleHamburgerMenu = () => {
        changeHamburgerMenuState(!isHamburgerMenuOpen);
    }

    function changeSectionHandler(newSectionName){
        if(sectionName != newSectionName){
            changeSection(newSectionName);
        }
    }

    return (
        <div className="mainscreen">
            <AppTopHeader currentSection={sectionName} 
                          changeCurrentSection={changeSectionHandler} 
                          isHamburgerMenuOpen={isHamburgerMenuOpen} 
                          changeHamburgerMenuState={toggleHamburgerMenu}/>
            {sectionName === "ToDo_List" ? <ToDoListSection/> 
            : sectionName === "Events" ? <EventsSection/> 
            : sectionName === "Settings" ? <SettingsSection/>
            : <BugReportSection/>}
        </div>
    );
}

export default MainScreen;