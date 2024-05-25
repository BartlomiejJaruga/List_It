import { useState } from 'react';
import '../styles/HomePage.css';
import '../components/MenuPanel';
import MenuPanel from '../components/MenuPanel';
import UsersPanel from '../components/UsersPanel';
import EventsPanel from '../components/EventsPanel';
import ReportsPanel from '../components/ReportsPanel';

function HomePage() {
    const panels = {
        "users":0,
        "events":1,
        "reports":2
    }
    const [panel, changePanel] = useState(panels["reports"]);

    function changePanelHandler(panelName){
        if(panelName in panels){
            changePanel(panelName);
        }
    }

    return (
        <div className='mainscreen'>
            <MenuPanel activePanel={panel} panelChangeHandler={changePanelHandler}/>
            {panel === "users" ?
                <UsersPanel/>
                : panel === "events" ?
                    <EventsPanel/>
                    : <ReportsPanel/>
            }
        </div>
    )
}

export default HomePage;
