import '../styles/HamburgerMenu.css';

function HamburgerMenu({ changeCurrentSection, isHamburgerMenuOpen, changeHamburgerMenuState }){
    return(
        <div className="hamburger_menu">
            <button onClick={changeHamburgerMenuState}>☰</button>
            <div className={`hamburger_menu_overlay ${isHamburgerMenuOpen ? 'hamburger_menu_open' : 'hamburger_menu_closed'}`} 
                 onClick={changeHamburgerMenuState}>
            </div>
            <div className={`hamburger_menu_options ${isHamburgerMenuOpen ? 'hamburger_menu_options_visible' : 'hamburger_menu_options_invisible'}`}
                 onClick={changeHamburgerMenuState}>
                    <button onClick={() => changeCurrentSection("ToDo_List")}>
                        <i className='fa fa-list-ol'></i>
                    </button>
                    <button onClick={() => changeCurrentSection("Events")}>
                        <i className='fa fa-calendar'></i>
                    </button>
                    <button onClick={() => changeCurrentSection("Settings")}>
                        <i className='fa fa-cog'></i>
                    </button>
                    <button onClick={() => changeCurrentSection("BugReport")}>
                        <i className='fa fa-bug'></i>
                    </button>
            </div>
        </div>
    );
}

export default HamburgerMenu;