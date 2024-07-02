import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const Footer = ({ token, isBusinessUser }) => (
  <footer className="footer">
    <nav>
      <ul className="footer-links">
        <li>
          <Link to='/about'>
            <HelpCenterIcon className="link-icon" />
            About
          </Link>
        </li>
        {token && <li><Link to='/favorites'>
          <FavoriteIcon className="link-icon" />
          Favorites
          </Link></li>}
        {token && isBusinessUser && <li><Link to='/my-cards'>
          <DocumentScannerIcon className="link-icon" />
        My Cards
        </Link></li>}
     
      </ul>
    </nav>
  </footer>
);

export default Footer;
