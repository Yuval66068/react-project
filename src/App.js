import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import RegisterForm from './components/Register/Register';
import Login from './components/Login/Login';
import useAPI from './hook/useAPI'; 
import Home from './components/Home/Home.jsx';
import CardNew from './components/Card/cardNew';
import CardView from './components/Card/cardView';
import CardEdit from './components/Card/cardEdit';
import Footer from './components/Footer';
import FavoritesCard from './components/favorites';
import MyCards from './components/myCard';


function App() {
  const currentTheme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(currentTheme || 'light');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [searchInput, setSearchInput] = useState("");

  const [userData, error, isLoading, callAPI] = useAPI();

  const [isBusiness, setIsBusiness] = useState(() => {
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        return parsedToken.userData?.isBusiness || false;
      } catch (e) {
        // If token is not JSON, return false
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (token) {
      callAPI('fetchUserData', null, { id: token });
    }
  }, [token, callAPI]);

  useEffect(() => {
    if (userData) {
      setIsBusiness(userData.isBusiness);
    }
  }, [userData]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    fetch('./models/apiSchemas.js', {
      headers: { Authorization: `Bearer ${newToken}` }
    })
      .then(response => response.json())
      .then(data => setIsBusiness(data.isBusiness))
      .catch(error => console.error(error));
    callAPI('fetchUserData', null, { id: newToken });
  };

  const handleLogout = () => {
    setToken(null);
    setIsBusiness(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      {!isLoading && (
        <Navbar 
          theme={theme} 
          setTheme={setTheme} 
          token={token} 
          isBusinessUser={isBusiness} 
          onLogout={handleLogout} 
          setSearchInput={setSearchInput} 
        />
      )}
      <div className={`container ${theme}`}>
        {isLoading && <p>Loading...</p>}
        {/* {error && <p>Error: {error}</p>} */}
        <Routes>
          <Route path="/RegisterForm" element={<RegisterForm handleLogin={handleLogin} />} />
          <Route path="/LoginForm" element={<Login handleLogin={handleLogin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/cardView/:cardId" element={<CardView />} />
          <Route path="/" element={<Home searchInput={searchInput} />} />
          <Route path="/favorites" element={<FavoritesCard token={token} />} />
          <Route path="/cardNew" element={<CardNew isBusinessUser={isBusiness} />} />
          <Route path="/cardEdit" element={<CardEdit isBusinessUser={isBusiness} />} />
          <Route path="/my-cards" element={<MyCards isBusinessUser={isBusiness} />} />
        </Routes>
        {userData && (
          <div>
            <h2>User Data:</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
      <Footer token={token} isBusinessUser={isBusiness} />
    </Router>
  );
}

export default App;
