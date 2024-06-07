import '../styles/ChangePasswordModal.css';
import { useState } from 'react';

function ChangePasswordModal({ closeModal, showNotification }) {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onNewPasswordSubmit = async (event) => {
        event.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setErrorMessage("New passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/api/user/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                }),
                credentials: "include",
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let errorData = '';
                if (contentType && contentType.includes("application/json")) {
                    errorData = await response.json();
                } else {
                    errorData = await response.text();
                }
                setErrorMessage(errorData.message || errorData);
                return;
            }

            const res = await response.json();
            if (res.status) {
                showNotification();
                closeModal();
            } else {
                setErrorMessage(res.message);
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <div className="change_password_popup_window">
                <form onSubmit={onNewPasswordSubmit}>
                    <input type="password" placeholder="Current Password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required />
                    <input type="password" placeholder="New Password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
                    <input type="password" placeholder="Confirm New Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <div className="change_password_buttons_container">
                        <button type="submit">CONFIRM</button>
                        <button type="button" onClick={closeModal}>CANCEL</button>
                    </div>
                </form>
            </div>
            <div className="change_password_overlay" onClick={closeModal} />
        </div>
    );
}

export default ChangePasswordModal;
