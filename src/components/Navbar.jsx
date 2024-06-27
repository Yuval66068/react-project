// Navbar.js
import React, { useState } from 'react';
import '../components/Navbar.css'
import logo_light from '../images/night.png';
import logo_dark from '../images/day.png';
import search_icon_light from '../images/search-w.png';
import search_icon_dark from '../images/search-b.png';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, setTheme, token, onLogout, setSearchInput }) => {
  const toggleMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('current_theme', newTheme);
  };
  const [input,setInput] = useState('');

  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <div className={`navbar ${theme === 'dark' ? 'dark' : ''}`}>
      <ul>
        <li className='list-title'><Link to='/Home'>BCARD</Link></li>
        <li><Link to='/about'>ABOUT</Link></li>
        {token && <li><Link to='/cardNew'>New Card</Link></li>}
      </ul>

      <div className='search-box'>
        <input type="text" placeholder='Search' onChange={(e) => setInput(e.target.value)} value={input}/>
        <img src={theme === 'light' ? search_icon_light : search_icon_dark} alt="search" onClick={() => setSearchInput(input)}/>
      </div>

      <div className='theme-buttons'>
        <button className='login-btn' onClick={toggleMode}>
          <img src={theme === 'light' ? logo_light : logo_dark} alt="night" style={{ width: '30px' }} />
        </button>
        {!token ? (
          <>
            <li><Link to='/RegisterForm'>SIGNUP</Link></li>
            <li><Link to='/LoginForm'>LOGIN</Link></li>
          </>
        ) : (
          <button className='login-btn' onClick={handleLogoutClick}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
