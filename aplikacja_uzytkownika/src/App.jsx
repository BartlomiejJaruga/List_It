import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import './styles/App.css';
import './assets/font-awesome-4.7.0/css/font-awesome.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import logo from './logo.svg';
import MainScreen from "./pages/MainScreen";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    return (
        <MainScreen />
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
