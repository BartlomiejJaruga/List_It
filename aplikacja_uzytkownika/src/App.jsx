import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/App.css';
import './assets/font-awesome-4.7.0/css/font-awesome.min.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/MainScreen';


function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark_mode');
            document.body.classList.remove('light_mode');
        } else {
            document.body.classList.add('light_mode');
            document.body.classList.remove('dark_mode');
        }
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/homepage" element={<HomePage isDarkMode={isDarkMode} switchDarkLightMode={toggleDarkMode}/>} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
