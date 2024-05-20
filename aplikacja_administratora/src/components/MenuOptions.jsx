import { useState } from 'react';

import React from 'react';
import './MenuOptions.css';

function MenuOptions(props) {
  const [activeTab, setActiveTab] = useState("reports");

  function buttonClickHandler(panel){
    setActiveTab(panel);
    props.panelChangeHandler(panel);
  }

  return (
    <div className="menu-options">
      <button 
        id="users_tab_btn" 
        className={activeTab === "users" ? "button_active" : ""}
        onClick={() => buttonClickHandler("users")}>Użytkownicy</button>
      <button 
        id="events_tab_btn" 
        className={activeTab === "events" ? "button_active" : ""}
        onClick={() => buttonClickHandler("events")}>Wydarzenia</button>
      <button 
        id="reports_tab_btn" 
        className={activeTab === "reports" ? "button_active" : ""}
        onClick={() => buttonClickHandler("reports")}>Zgłoszenia</button>
    </div>
  );
}

export default MenuOptions;