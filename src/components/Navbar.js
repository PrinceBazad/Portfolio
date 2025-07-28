import React, { useState, useEffect } from 'react';
import './Navbar.css';
import resumePDF from '../myphoto/Princebazad.pdf';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaCode, FaMapMarkerAlt, FaClock, FaBriefcase } from 'react-icons/fa';


function smoothScrollTo(element, duration = 1200) {
  const targetY = element.getBoundingClientRect().top + window.pageYOffset;
  const startY = window.pageYOffset;
  const diff = targetY - startY;
  let start;

  function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuad(percent));
    if (percent < 1) {
      window.requestAnimationFrame(step);
    }
  }
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  window.requestAnimationFrame(step);
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const handleMenuToggle = () => {
    setMenuOpen((open) => !open);
    // Prevent body scroll when menu is open
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.body.style.overflow = 'unset';
    const section = document.getElementById(id);
    if (section) {
      smoothScrollTo(section, 1200);
    }
  };

  const handleResumeClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    document.body.style.overflow = 'unset';
    window.open(resumePDF, '_blank');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Prince Bazad</div>
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <li><a href="#hero" onClick={e => handleLinkClick(e, 'hero')}>Home</a></li>
        <li><a href="#skills" onClick={e => handleLinkClick(e, 'skills')}>Skills</a></li>
        <li><a href="#projects" onClick={e => handleLinkClick(e, 'projects')}>Projects</a></li>
        <li><a href="#contact" onClick={e => handleLinkClick(e, 'contact')}>Contact</a></li>
        <li><a href="#" onClick={handleResumeClick}>Resume</a></li>
      </ul>
      <div className="theme-radio-group">
        <label className="theme-radio">
          <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
          Dark
        </label>
        <label className="theme-radio">
          <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} />
          Light
        </label>
      </div>
      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={handleMenuToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar; 