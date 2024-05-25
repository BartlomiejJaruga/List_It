import '../styles/AppTopHeader.css';
import HamburgerMenu from './HamburgerMenu';
import SectionNameHeader from './SectionNameHeader';

function AppTopHeader({ currentSection, changeCurrentSection, isHamburgerMenuOpen, changeHamburgerMenuState }){
    return(
        <div className="app_header">
            <HamburgerMenu changeCurrentSection={changeCurrentSection} 
                           isHamburgerMenuOpen={isHamburgerMenuOpen}
                           changeHamburgerMenuState={changeHamburgerMenuState}/>
            <SectionNameHeader currentSection={currentSection}/>
        </div>
    );
}

export default AppTopHeader;