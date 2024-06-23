import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import LoginForm from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import useAPI, { METHOD } from './hook/useAPI.jsx'
import Home from './components/Home/Home';
import CardView from './components/Card/cardView.jsx';
import Footer from '../src/components/Footer.jsx';

function App() {
  const currentTheme = localStorage.getItem('current_theme') || 'light';
  const [theme, setTheme] = useState(currentTheme);
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Manage token state
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiCall, apiError, apiIsLoading] = useAPI();

  const user = useSelector(state => state.user); // Assuming state.user is correctly populated

  // Function to handle login
  const handleLogin = async (formData) => {
    setIsLoading(true);
    try {
      const response = await apiCall(METHOD.USER_LOGIN, formData);
      setToken(response.token); // Set token in state
      localStorage.setItem('token', response.token); // Store token in localStorage
      setUserData(response.data);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError(error.message || 'Login failed');
      setIsLoading(false);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await apiCall(METHOD.USER_LOGOUT);
      setToken(null); // Clear token from state
      localStorage.removeItem('token'); // Remove token from localStorage
      setUserData(null);
      setError(null);
    } catch (error) {
      setError(error.message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch user data when token changes
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); // Initialize token state from localStorage
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const response = await apiCall(METHOD.USERS_GET_ONE, { id: 'current_user_id_or_identifier' });
          setUserData(response.data);
          setError(null);
        } catch (error) {
          setError(error.message || 'Failed to fetch user data');
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    }
  }, [apiCall]); // Trigger effect on apiCall change

  return (
    <div className={`container ${theme}`}>
  
        <Navbar theme={theme} setTheme={setTheme} token={token} onLogout={handleLogout} /> {/* Pass token and logout handler */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<CardView />} />
          <Route path="/registerForm" element={<Register />} />
          <Route path="/loginForm" element={<LoginForm onLogin={handleLogin} />} /> {/* Pass onLogin handler */}
          <Route path="/about" element={<About />} />
          <Route path="/Footer" element={<Footer />} />
        </Routes>
     

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {apiError && <p>API Error: {apiError}</p>}
      {userData && (
        <div>
          <h2>User Data:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
