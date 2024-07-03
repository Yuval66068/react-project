import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo_light from '../images/night.png';
import logo_dark from '../images/day.png';
import search_icon_light from '../images/search-w.png';
import search_icon_dark from '../images/search-b.png';
import businessProfileIcon from '../images/man.png';
import regularProfileIcon from '../images/user.png';

const Navbar = ({ theme, setTheme, token, isBusinessUser, onLogout, setSearchInput }) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('current_theme', newTheme);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className={`navbar ${theme === 'dark' ? 'dark' : ''}`}>
      <ul className="nav-links">
        <li className='list-title'><Link to='/'>BCARD</Link></li>
        <li><Link to='/about'>ABOUT</Link></li>
        {token &&  <li><Link to='/favorites'>Favorites</Link></li>}
        {isBusinessUser && <li><Link to='/my-cards'>My Cards</Link></li>}
      </ul>

      <div className='search-box'>
        <input type="text" placeholder='Search' onChange={(e) => setInput(e.target.value)} value={input} />
        <img src={theme === 'light' ? search_icon_light : search_icon_dark} alt="search" onClick={() => setSearchInput(input)} />
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
          <>
            <li>
              <button className='login-btn' onClick={handleLogoutClick}>LOGOUT</button>
              <img
                src={isBusinessUser ? businessProfileIcon : regularProfileIcon}
                alt="profile"
                className="profile-icon"
              />
            </li>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
