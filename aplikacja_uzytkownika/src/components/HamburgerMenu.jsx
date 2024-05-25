import '../styles/HamburgerMenu.css';

function HamburgerMenu({ changeCurrentSection, isHamburgerMenuOpen, changeHamburgerMenuState }){
    return(
        <div className="hamburger_menu">
            <button onClick={changeHamburgerMenuState}>☰</button>
            <div className={`hamburger_menu_options ${isHamburgerMenuOpen ? 'hamburger_menu_open' : ''}`}>
                <div className='hamburger_menu_overlay_background' onClick={changeHamburgerMenuState}>
                    <button onClick={() => changeCurrentSection("ToDo_List")}>TDL</button>
                    <button onClick={() => changeCurrentSection("Events")}>E</button>
                    <button onClick={() => changeCurrentSection("Settings")}>S</button>
                    <button onClick={() => changeCurrentSection("BugReport")}>BR</button>
                </div>
            </div>
        </div>
    );
}

export default HamburgerMenu;