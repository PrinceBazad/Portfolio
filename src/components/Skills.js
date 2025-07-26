import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';
import { FaHtml5, FaCss3Alt, FaJava, FaJs, FaReact, FaPython, FaDatabase, FaPhp } from 'react-icons/fa';

const skills = [
  { name: 'HTML', level: 95, icon: <FaHtml5 color="#e44d26" /> },
  { name: 'CSS', level: 85, icon: <FaCss3Alt color="#1572b6" /> },
  { name: 'Java', level: 70, icon: <FaJava color="#f89820" /> },
  { name: 'JavaScript', level: 50, icon: <FaJs color="#f7df1e" /> },
  { name: 'React', level: 60, icon: <FaReact color="#61dafb" /> },
  { name: 'Python', level: 45, icon: <FaPython color="#3776ab" /> },
  { name: 'SQL', level: 80, icon: <FaDatabase color="#00618a" /> },
  { name: 'Django', level: 65, icon: <FaPython color="#092e20" /> },
  { name: 'PHP', level: 55, icon: <FaPhp color="#777bb4" /> },
];

const Skills = () => {
  const cardsRef = useRef([]);
  const iconRefs = useRef([]);
  const [progress, setProgress] = useState(Array(skills.length).fill(0));

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            const idx = Number(entry.target.getAttribute('data-idx'));
            if (iconRefs.current[idx]) iconRefs.current[idx].classList.add('icon-animate');
            // progress bar percentage animation
            setTimeout(() => {
              setProgress((prev) => {
                const updated = [...prev];
                updated[idx] = skills[idx].level;
                return updated;
              });
            }, 200 + idx * 120);
          }
        });
      },
      { threshold: 0.2 }
    );
    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => {
      cardsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="skills" id="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, idx) => {
          const dasharray = 188.4;
          const dashoffset = dasharray - (dasharray * progress[idx]) / 100;
          const skillClass = `skill-card ${skill.name.toLowerCase()}`;
          return (
            <div
              className={skillClass}
              key={idx}
              ref={el => (cardsRef.current[idx] = el)}
              data-idx={idx}
            >
              <div className="skill-icon" ref={el => (iconRefs.current[idx] = el)}>{skill.icon}</div>
              <div className="circle-wrap">
                <svg className="circle-svg" width="70" height="70">
                  <circle className="circle-bg" cx="35" cy="35" r="30" />
                  <circle
                    className="circle-bar"
                    cx="35"
                    cy="35"
                    r="30"
                    style={{ strokeDasharray: dasharray, strokeDashoffset: dashoffset }}
                  />
                </svg>
                <div className="circle-text">{progress[idx]}%</div>
              </div>
              <div className="skill-name">{skill.name}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills; 