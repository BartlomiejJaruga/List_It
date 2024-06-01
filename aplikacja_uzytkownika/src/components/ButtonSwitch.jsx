import '../styles/ButtonSwitch.css';

function ButtonSwitch( { isActive, actionHandler } ){
    return (
        <div className="button_switch_container" onClick={actionHandler}>
            <div className={`button_switch_circle 
                ${isActive 
                ? 'button_switch_circle_active' 
                : 'button_switch_circle_not_active'} `} 
            />
        </div>
    );
}

export default ButtonSwitch;