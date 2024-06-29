import React from 'react';
import './Footer.css';
import { FaInfoCircle, FaFileContract, FaEnvelope, FaGithub } from 'react-icons/fa';
import { Home, AccountCircle, Settings } from '@mui/icons-material'; 
import { Link } from 'react-router-dom';
import about from '../images/about.png'

const Footer = ({ token, isBusinessUser }) => (
  <footer className="footer">
    <nav>
      <ul className="footer-links">
        <li> <Link to='/about'>About</Link ></li>
        {token && <li><Link to='favorites'>Favorites</Link></li>}
        {isBusinessUser && <li><Link to='/my-cards'>My Cards</Link></li>}
        {isBusinessUser && <li><Link to='/CardNew'>Create New Card</Link></li>}
     
      </ul>
    </nav>
  </footer>
);

export default Footer;
