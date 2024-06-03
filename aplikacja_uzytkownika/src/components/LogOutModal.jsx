import React from 'react';
import '../styles/LogOutModal.css';
import { useNavigate } from 'react-router-dom';

function LogOutModal({ show, closeModal }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/logout", {
                method: "GET",
                credentials: "include", // Ensure cookies are sent/received
            });

            if (response.ok) {
                // Clear session storage or any client-side storage
                sessionStorage.removeItem("user");
                navigate("/"); // Redirect to the login page
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            closeModal();
        }
    };

    return (
        <div className={`log_out_modal ${show ? "show_logout_modal" : ""}`}>
            <h2>Czy na pewno chcesz się wylogować?</h2>
            <div className="log_out_button_container">
                <button onClick={handleLogout}>
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
