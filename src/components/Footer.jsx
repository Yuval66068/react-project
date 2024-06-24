// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; Yuval Tamir</p>
      <ul className="footer-links">
        <li><a href="/about">About</a></li>
        <li><a href="/terms-of-service">Terms of Service</a></li>
        <li><a href="/contact-us">Contact Us</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
