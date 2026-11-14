import React, { useState } from 'react';
import './Hero.css';
import { Typewriter } from 'react-simple-typewriter';
import myPhoto from '../myphoto/resume.jpg';
import { FaCss3Alt, FaHtml5, FaJs, FaPython, FaReact } from 'react-icons/fa';

const visitorJourneys = [
  {
    label: 'Recruiter',
    steps: [{ section: 'projects', label: 'Featured projects' }, { section: 'contact', label: 'Contact' }],
  },
  {
    label: 'Builder',
    steps: [{ section: 'skills', label: 'Skills constellation' }, { section: 'projects', label: 'Project portals' }, { section: 'contact', label: 'Contact' }],
  },
  {
    label: 'Explorer',
    steps: [{ section: 'skills', label: 'Skills constellation' }, { section: 'projects', label: 'Project portals' }],
  },
];

const Hero = ({ scrollProgress, onChooseJourney }) => {
  const [avatarMessage, setAvatarMessage] = useState('Psst... this little world is interactive.');
  const [avatarReaction, setAvatarReaction] = useState(0);
  const avatarMessages = [
    'You found the portal. Nice.',
    'Pixels are better when they move.',
    'Try opening one of my project portals.',
  ];

  const reactToAvatar = () => {
    setAvatarMessage(avatarMessages[avatarReaction % avatarMessages.length]);
    setAvatarReaction((count) => count + 1);
  };

  const handlePortraitPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty('--tilt-x', `${pointerY * -10}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${pointerX * 12}deg`);
  };

  const resetPortraitTilt = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-left">
        <h1 className="hero-title">
          Prince Bazad
          <span className="hero-title-glitch" data-text="Prince Bazad" aria-hidden="true" />
        </h1>
        <h2 className="hero-subtitle">Web Developer</h2>
        <p className="hero-intro">
          <Typewriter
            words={['I build beautiful, animated, and responsive websites.', 'I love coding and solving problems.', 'Let\'s build something amazing!']}
            loop={0}
            cursor
            cursorStyle='|'
            typeSpeed={60}
            deleteSpeed={60}
            delaySpeed={1800}
            deleteAll={true}
          />
        </p>
        <div className="hero-socials">
          <a href="https://www.linkedin.com/in/prince-bazad-3a2410274/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/PrinceBazad" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://leetcode.com/u/prince_bazad/" target="_blank" rel="noopener noreferrer">LeetCode</a>
        </div>
        <div className="hero-journey-picker">
          <span>CHOOSE YOUR PORTAL</span>
          <div>
            {visitorJourneys.map((journey) => (
              <button type="button" key={journey.label} onClick={() => onChooseJourney(journey)}>
                {journey.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="hero-right" onPointerMove={handlePortraitPointerMove} onPointerLeave={resetPortraitTilt}>
        <div
          className="hero-portrait-scene hero-world"
          style={{ '--scroll-tilt': `${scrollProgress * 12}deg` }}
        >
          <div className="world-island" aria-hidden="true">
            <span className="world-island-side" />
            <span className="world-island-top" />
            <i className="world-tower tower-one" />
            <i className="world-tower tower-two" />
            <i className="world-tower tower-three" />
            <i className="world-tree tree-one" />
            <i className="world-tree tree-two" />
          </div>
          <span className="hero-coordinate" aria-hidden="true">PB / 01</span>
          <div className="hero-orbit-badge orbit-react" aria-hidden="true"><FaReact /></div>
          <div className="hero-orbit-badge orbit-python" aria-hidden="true"><FaPython /></div>
          <div className="hero-orbit-badge orbit-js" aria-hidden="true"><FaJs /></div>
          <div className="hero-orbit-badge orbit-html" aria-hidden="true"><FaHtml5 /></div>
          <div className="hero-orbit-badge orbit-css" aria-hidden="true"><FaCss3Alt /></div>
          <span className="hero-avatar-bubble" aria-live="polite">{avatarMessage}</span>
          <button
            type="button"
            className="hero-avatar-trigger"
            aria-label="Make the portfolio avatar react"
            onPointerEnter={() => setAvatarMessage('Hey, explorer! Click me for a reaction.')}
            onClick={reactToAvatar}
          >
            <img src={myPhoto} alt="Prince Bazad" className="hero-photo" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 