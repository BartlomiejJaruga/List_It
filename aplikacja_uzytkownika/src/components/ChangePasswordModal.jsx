import '../styles/ChangePasswordModal.css';

function ChangePasswordModal({ closeModal, showNotification }){
    function onNewPasswordSubmit(event){
        event.preventDefault();
        showNotification();
        closeModal();
    }

    return(
        <div>
            <div className="change_password_popup_window">
                <form onSubmit={onNewPasswordSubmit}>
                    <input type="password" placeholder="Stare hasło" required/>
                    <input type="password" placeholder="Nowe hasło" required/>
                    <input type="password" placeholder="Potwierdź nowe hasło" required/>
                    <div className="change_password_buttons_container">
                        <button type="button" onClick={closeModal}>ANULUJ</button>
                        <button type="submit">POTWIERDŹ</button>
                    </div>
                </form>
            </div>
            <div className="change_password_overlay" onClick={closeModal} />
        </div>
        
    );
}

export default ChangePasswordModal;