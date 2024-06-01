import { useState } from 'react';
import '../styles/SettingsSection.css';
import ButtonSwitch from './ButtonSwitch';
import ChangePasswordModal from './ChangePasswordModal';

function SettingsSection({ isDarkMode, switchDarkLightMode }){
    const [ isNotificationsOn, setIsNotificationsOn ] = useState(false);
    const [ isChangingPasswordModalOn, setIsChangingPasswordModalOn ] = useState(false);

    function setNotificationOnOffHandler(){
        setIsNotificationsOn(!isNotificationsOn);
    }

    function setChangingPasswordModalOnOffHandler(){
        setIsChangingPasswordModalOn(!isChangingPasswordModalOn);
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
                        <ButtonSwitch isActive={isNotificationsOn} actionHandler={setNotificationOnOffHandler}/>
                    </div>
                </div>
                <div className="log_out_and_change_password_container">
                    <button className="settings_log_out_button">WYLOGUJ SIĘ</button>
                    <button className="settings_change_password_button" 
                            onClick={setChangingPasswordModalOnOffHandler}>
                        ZMIEŃ HASŁO
                    </button>
                </div>
            </div>
            { isChangingPasswordModalOn ? <ChangePasswordModal /> : null }
        </>
        
    );
}

export default SettingsSection;