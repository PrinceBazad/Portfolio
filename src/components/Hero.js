import React from 'react';
import './Hero.css';
import { Typewriter } from 'react-simple-typewriter';
import myPhoto from '../myphoto/resume.jpg';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-left">
        <h1 className="hero-title">Prince Bazad</h1>
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
      </div>
      <div className="hero-right">
        <img src={myPhoto} alt="Prince Bazad" className="hero-photo" />
      </div>
    </section>
  );
};

export default Hero; 