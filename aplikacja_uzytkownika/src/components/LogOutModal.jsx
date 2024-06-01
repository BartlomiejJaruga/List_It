import '../styles/LogOutModal.css';

function LogOutModal({ show, closeModal }){
    return(
        <div className={`log_out_modal ${show ? "show_logout_modal" : ""}`}>
            <h2>Czy na pewno chcesz się wylogować?</h2>
            <div className="log_out_button_container">
                <button onClick={closeModal}>
                    <i className="fa fa-check" aria-hidden="true" />
                </button>
                <button onClick={closeModal}>
                    <i className="fa fa-times" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}

export default LogOutModal;