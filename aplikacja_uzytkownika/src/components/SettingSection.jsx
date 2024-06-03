import { useState } from 'react';
import '../styles/SettingsSection.css';
import ButtonSwitch from './ButtonSwitch';
import ChangePasswordModal from './ChangePasswordModal';
import Notification from './Notification';
import LogOutModal from './LogOutModal';

function SettingsSection({ isDarkMode, switchDarkLightMode }){
    const [ isNotificationsOptionOn, setIsNotificationsOn ] = useState(false);
    const [ isChangingPasswordModalOn, setIsChangingPasswordModalOn ] = useState(false);
    const [ showNotification, setShowNotification ] = useState(false);
    const [ isLogOutModalOn, setIsLogOutModalOn ] = useState(false);

    function setNotificationOnOffHandler(){
        setIsNotificationsOn(!isNotificationsOptionOn);
    }

    function setChangingPasswordModalOnOffHandler(){
        setIsChangingPasswordModalOn(!isChangingPasswordModalOn);
    }

    function setShowNotificationHandler(){
        setShowNotification(true);
    }

    function setCloseNotificationHandler(){
        setShowNotification(false);
    }

    function setIsLogOutModalOnOffHandler(){
        setIsLogOutModalOn(!isLogOutModalOn);
    }

    return(
        <>
            <div className="settings_container">
                <div className="switches_container">
                    <div className="dark_mode_switch">
                        <h2>Tryb Ciemny</h2>
                        <ButtonSwitch isActive={isDarkMode} actionHandler={switchDarkLightMode}/>
                    </div>
                    <div className="notification_switch">
                        <h2>Powiadomienia o wydarzeniach</h2>
                        <ButtonSwitch isActive={isNotificationsOptionOn} actionHandler={setNotificationOnOffHandler}/>
                    </div>
                </div>
                <div className="log_out_and_change_password_container">
                    <button className="settings_log_out_button" 
                            onClick={setIsLogOutModalOnOffHandler}>WYLOGUJ SIĘ</button>
                    <button className="settings_change_password_button" 
                            onClick={setChangingPasswordModalOnOffHandler}>
                        ZMIEŃ HASŁO
                    </button>
                </div>
            </div>
            { isChangingPasswordModalOn 
            ? <ChangePasswordModal closeModal={setChangingPasswordModalOnOffHandler} showNotification={setShowNotificationHandler}/> 
            : null }
            <Notification message="Hasło zostało zmienione." 
                          show={showNotification} 
                          onClose={setCloseNotificationHandler}
                          isDarkModeOn={isDarkMode} />
            <LogOutModal show={isLogOutModalOn} closeModal={setIsLogOutModalOnOffHandler} />
            { isLogOutModalOn
            ? <div className="log_out_modal_overlay" onClick={setIsLogOutModalOnOffHandler}></div>
            : null }
        </>
    );
}

export default SettingsSection;