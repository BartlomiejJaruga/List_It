import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './assets/font-awesome-4.7.0/css/font-awesome.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import logo from './logo.svg';
import MainScreen from "./pages/MainScreen";


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

    const toggleModeHandler = () => {
        setIsDarkMode(!isDarkMode);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    return (
        <MainScreen isDarkMode = {isDarkMode} switchDarkLightMode = {toggleModeHandler}/>
        /*<Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? (
                                <div>
                                    <header className="App-header">
                                        <img src={logo} className="App-logo" alt="logo" />
                                        <h1>Welcome to the Main Application</h1>
                                        <p>Edit <code>src/App.jsx</code> and save to reload.</p>
                                        <a
                                            className="App-link"
                                            href="https://reactjs.org"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Learn React
                                        </a>
                                    </header>
                                </div>
                            ) : (
                                showRegister ? (
                                    <Register onToggleLogin={toggleRegister} />
                                ) : (
                                    <Login onLogin={handleLogin} onToggleRegister={toggleRegister} />
                                )
                            )
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} onToggleRegister={toggleRegister} />} />
                </Routes>
            </div>
        </Router>*/
    );
}

export default App;
