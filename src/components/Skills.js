import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';
import { FaHtml5, FaCss3Alt, FaJava, FaJs, FaReact, FaPython, FaDatabase, FaPhp } from 'react-icons/fa';

const skills = [
  { name: 'HTML', level: 95, icon: <FaHtml5 color="#e44d26" />, projects: ['Hotel website', 'Stock Market Analyzer', 'IFFCO Branch(Azad)'] },
  { name: 'CSS', level: 85, icon: <FaCss3Alt color="#1572b6" />, projects: ['Hotel website', 'Stock Market Analyzer', 'IFFCO Branch(Azad)'] },
  { name: 'Java', level: 70, icon: <FaJava color="#f89820" />, projects: [] },
  { name: 'JavaScript', level: 50, icon: <FaJs color="#f7df1e" />, projects: ['Hotel website', 'Stock Market Analyzer'] },
  { name: 'React', level: 60, icon: <FaReact color="#61dafb" />, projects: ['Stock Market Analyzer'] },
  { name: 'Python', level: 45, icon: <FaPython color="#3776ab" />, projects: ['Multi Lingual chatroom', 'Stock Market Analyzer', 'IFFCO Branch(Azad)'] },
  { name: 'SQL', level: 80, icon: <FaDatabase color="#00618a" />, projects: [] },
  { name: 'Django', level: 65, icon: <FaPython color="#092e20" />, projects: ['IFFCO Branch(Azad)'] },
  { name: 'PHP', level: 55, icon: <FaPhp color="#777bb4" />, projects: ['Hotel website'] },
];

const projectLinks = {
  'Multi Lingual chatroom': 'https://github.com/PrinceBazad/Multi_Lingual_Chatroom/',
  'Hotel website': 'https://github.com/PrinceBazad/hotel/',
  'Stock Market Analyzer': 'https://github.com/PrinceBazad/Stock_analyzer/',
  'IFFCO Branch(Azad)': 'https://github.com/PrinceBazad/AZADCOOPERATIVE.in/',
};

const initialNodePositions = {
  HTML: { x: 13, y: 25 },
  CSS: { x: 36, y: 17 },
  Java: { x: 68, y: 20 },
  JavaScript: { x: 86, y: 43 },
  React: { x: 65, y: 54 },
  Python: { x: 36, y: 63 },
  SQL: { x: 13, y: 50 },
  Django: { x: 29, y: 83 },
  PHP: { x: 75, y: 82 },
};

const connections = [
  ['HTML', 'CSS'],
  ['CSS', 'JavaScript'],
  ['JavaScript', 'React'],
  ['React', 'Python'],
  ['Python', 'Django'],
  ['Python', 'SQL'],
  ['Django', 'PHP'],
  ['HTML', 'SQL'],
  ['Java', 'JavaScript'],
  ['CSS', 'Python'],
  ['React', 'PHP'],
];

const Skills = () => {
  const cardsRef = useRef([]);
  const iconRefs = useRef([]);
  const [progress, setProgress] = useState(Array(skills.length).fill(0));
  const [constellationMode, setConstellationMode] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('React');
  const [nodePositions, setNodePositions] = useState(initialNodePositions);
  const draggingSkillRef = useRef(null);

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

  const updateDraggedNode = (event) => {
    const skillName = draggingSkillRef.current;
    if (!skillName) return;

    const map = event.currentTarget.closest('.skill-constellation-map');
    if (!map) return;

    const bounds = map.getBoundingClientRect();
    const x = Math.max(8, Math.min(92, ((event.clientX - bounds.left) / bounds.width) * 100));
    const y = Math.max(12, Math.min(88, ((event.clientY - bounds.top) / bounds.height) * 100));
    setNodePositions((current) => ({ ...current, [skillName]: { x, y } }));
  };

  const focusedSkill = skills.find((skill) => skill.name === selectedSkill) || skills[0];
  const focusedProjects = focusedSkill.projects.map((title) => ({
    title,
    link: projectLinks[title],
  }));

  return (
    <section className="skills" id="skills">
      <h2>Skills</h2>
      <div className="skills-mode-toggle" role="group" aria-label="Choose skills view">
        <button
          type="button"
          className={!constellationMode ? 'selected' : ''}
          aria-pressed={!constellationMode}
          onClick={() => setConstellationMode(false)}
        >
          STACK VIEW
        </button>
        <button
          type="button"
          className={constellationMode ? 'selected' : ''}
          aria-pressed={constellationMode}
          onClick={() => setConstellationMode(true)}
        >
          SKILL CONSTELLATION
        </button>
      </div>
      <div className={`skills-grid${constellationMode ? ' skills-grid-hidden' : ''}`} aria-hidden={constellationMode}>
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
      {constellationMode && (
        <div className="skill-constellation-layout">
          <div className="skill-constellation-map">
            <div className="constellation-instructions">DRAG NODES / SELECT TO INSPECT</div>
            <svg className="constellation-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {connections.map(([from, to]) => (
                <line
                  key={`${from}-${to}`}
                  x1={nodePositions[from].x}
                  y1={nodePositions[from].y}
                  x2={nodePositions[to].x}
                  y2={nodePositions[to].y}
                />
              ))}
            </svg>
            {skills.map((skill) => (
              <button
                type="button"
                key={skill.name}
                className={`skill-constellation-node${selectedSkill === skill.name ? ' selected' : ''}`}
                style={{ left: `${nodePositions[skill.name].x}%`, top: `${nodePositions[skill.name].y}%` }}
                aria-label={`${skill.name}, ${skill.level}%`}
                aria-pressed={selectedSkill === skill.name}
                onClick={() => setSelectedSkill(skill.name)}
                onPointerDown={(event) => {
                  draggingSkillRef.current = skill.name;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setSelectedSkill(skill.name);
                }}
                onPointerMove={updateDraggedNode}
                onPointerUp={() => { draggingSkillRef.current = null; }}
                onPointerCancel={() => { draggingSkillRef.current = null; }}
              >
                <span>{skill.icon}</span>
                <b>{skill.name}</b>
              </button>
            ))}
          </div>
          <aside className="constellation-details" aria-live="polite">
            <span className="constellation-details-kicker">NODE FOCUS / {String(skills.indexOf(focusedSkill) + 1).padStart(2, '0')}</span>
            <div className="constellation-focus-icon">{focusedSkill.icon}</div>
            <h3>{focusedSkill.name}</h3>
            <div className="constellation-level">
              <span>SELF-RATED COMFORT</span>
              <b>{focusedSkill.level}%</b>
            </div>
            <div className="constellation-level-track"><i style={{ width: `${focusedSkill.level}%` }} /></div>
            <span className="constellation-projects-label">CONNECTED PROJECTS</span>
            {focusedProjects.length ? (
              <ul className="constellation-projects">
                {focusedProjects.map((project) => (
                  <li key={project.title}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="constellation-empty">No featured project is linked to this skill yet.</p>
            )}
          </aside>
        </div>
      )}
    </section>
  );
};

export default Skills; 