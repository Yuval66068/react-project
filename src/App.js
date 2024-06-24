// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import RegisterForm from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import useAPI, { METHOD } from './hook/useAPI'; // Adjusted import path


function App() {
  const currentTheme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(currentTheme || 'light');
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const [userData, error, isLoading, fetchUserData] = useAPI();

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token, fetchUserData]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} token={token} onLogout={handleLogout} />

        <Routes>
          <Route path="/RegisterForm" element={<RegisterForm handleLogin={handleLogin} />} />
          <Route path="/LoginForm" element={<Login handleLogin={handleLogin} />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {userData && (
          <div>
            <h2>User Data:</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
