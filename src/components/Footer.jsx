import React from 'react';
import './Footer.css'; // Import your CSS file for Footer styling

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; Yuval Tamir</p>
            <ul className="footer-links">
                <img className='info' src="../images/information.png" alt='' />
                <li><a href="/'About">About</a></li>
                <img className='heart' src="../images/heart.png.png" alt='' />
                <li><a href="/'Terms of Service">Terms of Service</a></li>
                <li><a href="/'Contact Us">Contact Us</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
