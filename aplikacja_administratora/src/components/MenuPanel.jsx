import './MenuPanel.css';
import UserProfile from './UserProfile';
import MenuOptions from './MenuOptions';
import LogoutButton from './LogoutButton';

function MenuPanel(props){
    return (
        <div className="menu_panel">
            <UserProfile />
            <MenuOptions activePanel={props.activePanel} panelChangeHandler={props.panelChangeHandler}/>
            <LogoutButton />
        </div>
    )
}

export default MenuPanel;