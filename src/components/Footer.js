import React from 'react';
import './Footer.css';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaCode } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-socials">
          <a href="https://www.linkedin.com/in/prince-bazad-3a2410274/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://github.com/PrinceBazad" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="mailto:princebazad3@gmail.com"><FaEnvelope /></a>
          <a href="tel:+918572880980"><FaPhone /></a>
          <a href="https://leetcode.com/u/prince_bazad/" target="_blank" rel="noopener noreferrer"><FaCode /></a>
        </div>
        <div className="footer-text">
          © {new Date().getFullYear()} Prince Bazad. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 