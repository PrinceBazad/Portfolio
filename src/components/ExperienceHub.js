import React, { useEffect, useRef, useState } from 'react';
import { FaBriefcase, FaCode, FaEnvelope, FaGamepad, FaHome, FaTerminal, FaTimes, FaUserAstronaut } from 'react-icons/fa';
import './ExperienceHub.css';

const desktopApps = [
  { label: 'About me', section: 'hero', summary: 'Web developer, creative thinker, and builder of interactive digital spaces.', icon: <FaUserAstronaut /> },
  { label: 'Skills', section: 'skills', summary: 'Explore the stack and pull a skill node around in the constellation.', icon: <FaCode /> },
  { label: 'Projects', section: 'projects', summary: 'Open a 3D project portal and try its local interactive demo.', icon: <FaBriefcase /> },
  { label: 'Contact', section: 'contact', summary: 'Find the best way to connect and start something new.', icon: <FaEnvelope /> },
];

const ExperienceHub = ({ onClose, onAchievement, onSecretUnlock }) => {
  const [activeTab, setActiveTab] = useState('desktop');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState(['PB PORTFOLIO SYSTEM // v1.0', 'Type help to see available commands.']);
  const [playing, setPlaying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [orbPosition, setOrbPosition] = useState({ x: 52, y: 48 });
  const [activeDesktopApp, setActiveDesktopApp] = useState({
    label: 'Welcome',
    section: 'hero',
    summary: 'Pick an icon, open a tool, or find the secret command hiding in the terminal.',
  });
  const [desktopWindowPosition, setDesktopWindowPosition] = useState({ x: 0, y: 0 });
  const closeButtonRef = useRef(null);
  const windowDragRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setSecondsLeft((remaining) => Math.max(remaining - 1, 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (playing && secondsLeft === 0) setPlaying(false);
  }, [playing, secondsLeft]);

  const navigateToSection = (section) => {
    onClose();
    window.setTimeout(() => {
      const target = document.getElementById(section);
      if (!target) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }, 0);
  };

  const executeTerminalCommand = (event) => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;
    setTerminalInput('');

    if (command === 'clear') {
      setTerminalOutput([]);
      return;
    }

    const destinations = {
      about: 'hero',
      home: 'hero',
      skills: 'skills',
      projects: 'projects',
      contact: 'contact',
    };
    if (destinations[command]) {
      setTerminalOutput((output) => [...output.slice(-5), `$ ${command}`, `Navigating to ${command}...`]);
      navigateToSection(destinations[command]);
      return;
    }
    if (command === 'desktop' || command === 'os') {
      setActiveTab('desktop');
      setTerminalOutput((output) => [...output.slice(-5), `$ ${command}`, 'Desktop loaded.']);
      return;
    }
    if (command === 'arcade' || command === 'game') {
      setActiveTab('arcade');
      return;
    }
    if (command === 'sudo delight') {
      onSecretUnlock();
      onAchievement('Hidden theme unlocked');
      setTerminalOutput((output) => [...output.slice(-5), '$ sudo delight', 'ACCESS GRANTED // secret spectrum activated']);
      return;
    }

    const response = command === 'help'
      ? 'Commands: about, skills, projects, contact, desktop, arcade, clear'
      : 'Command not found. Type help to see the available commands.';
    setTerminalOutput((output) => [...output.slice(-5), `$ ${command}`, response]);
  };

  const hitOrb = () => {
    if (!playing) return;
    const nextScore = score + 1;
    setScore(nextScore);
    if (nextScore >= 12) {
      setPlaying(false);
      onAchievement('Arcade champion');
    }
    setOrbPosition({ x: 9 + Math.random() * 78, y: 12 + Math.random() * 66 });
  };

  const openDesktopApp = (app) => {
    setActiveDesktopApp(app);
    setDesktopWindowPosition({ x: 0, y: 0 });
  };

  const startWindowDrag = (event) => {
    if (event.target.closest('button')) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    windowDragRef.current = {
      x: event.clientX - desktopWindowPosition.x,
      y: event.clientY - desktopWindowPosition.y,
    };
  };

  const moveDesktopWindow = (event) => {
    if (!windowDragRef.current) return;
    setDesktopWindowPosition({
      x: event.clientX - windowDragRef.current.x,
      y: event.clientY - windowDragRef.current.y,
    });
  };

  const stopWindowDrag = () => {
    windowDragRef.current = null;
  };

  return (
    <div
      className="experience-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="experience-dialog" role="dialog" aria-modal="true" aria-labelledby="experience-title">
        <header className="experience-header">
          <div>
            <span className="experience-eyebrow">PRINCE BAZAD / INTERACTIVE SYSTEM</span>
            <h2 id="experience-title">Choose your reality.</h2>
          </div>
          <button ref={closeButtonRef} type="button" className="experience-close" onClick={onClose} aria-label="Close experience hub">
            <FaTimes />
          </button>
        </header>
        <div className="experience-tabs" role="tablist" aria-label="Experience modes">
          <button type="button" role="tab" aria-selected={activeTab === 'desktop'} onClick={() => setActiveTab('desktop')}>
            <FaHome /> Desktop OS
          </button>
          <button type="button" role="tab" aria-selected={activeTab === 'terminal'} onClick={() => setActiveTab('terminal')}>
            <FaTerminal /> Terminal
          </button>
          <button type="button" role="tab" aria-selected={activeTab === 'arcade'} onClick={() => setActiveTab('arcade')}>
            <FaGamepad /> Arcade
          </button>
        </div>
        <div className="experience-panel" role="tabpanel">
          {activeTab === 'desktop' && (
            <div className="hub-desktop">
              <div className="hub-desktop-topline"><span>PB / PERSONAL DESKTOP</span><span>ONLINE · 2026</span></div>
              <div className="hub-desktop-icons">
                {desktopApps.map((app) => (
                  <button type="button" key={app.section} onClick={() => openDesktopApp(app)}>
                    <span>{app.icon}</span>{app.label}
                  </button>
                ))}
                <button type="button" onClick={() => setActiveTab('terminal')}>
                  <span><FaTerminal /></span>Terminal
                </button>
                <button type="button" onClick={() => setActiveTab('arcade')}>
                  <span><FaGamepad /></span>Arcade
                </button>
              </div>
              <div
                className="hub-desktop-window"
                style={{ transform: `translate(${desktopWindowPosition.x}px, ${desktopWindowPosition.y}px)` }}
              >
                <div
                  className="hub-window-bar"
                  onPointerDown={startWindowDrag}
                  onPointerMove={moveDesktopWindow}
                  onPointerUp={stopWindowDrag}
                  onPointerCancel={stopWindowDrag}
                >
                  <span>{activeDesktopApp ? `${activeDesktopApp.label.toUpperCase()}.EXE` : 'WINDOW CLOSED'}</span>
                  <button
                    type="button"
                    onClick={() => setActiveDesktopApp((current) => current ? null : {
                      label: 'Welcome',
                      section: 'hero',
                      summary: 'Pick an icon, open a tool, or find the secret command hiding in the terminal.',
                    })}
                    aria-label={activeDesktopApp ? 'Close desktop window' : 'Restore desktop window'}
                  >
                    {activeDesktopApp ? '×' : '↗'}
                  </button>
                </div>
                {activeDesktopApp && (
                  <>
                    <strong>{activeDesktopApp.label === 'Welcome' ? 'Curiosity looks good on you.' : activeDesktopApp.label}</strong>
                    <p>{activeDesktopApp.summary}</p>
                    {activeDesktopApp.section && (
                      <button type="button" className="hub-window-open" onClick={() => navigateToSection(activeDesktopApp.section)}>
                        Open section
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="hub-desktop-taskbar"><span>PB</span><span>6 APPS READY</span></div>
            </div>
          )}
          {activeTab === 'terminal' && (
            <div className="hub-terminal">
              <div className="hub-terminal-output" aria-live="polite">
                {terminalOutput.map((line, index) => (
                  <p key={`${index}-${line}`} className={line.startsWith('$') ? 'terminal-command-line' : ''}>{line}</p>
                ))}
              </div>
              <form onSubmit={executeTerminalCommand}>
                <label htmlFor="experience-terminal-input">visitor@prince:~$</label>
                <input
                  id="experience-terminal-input"
                  value={terminalInput}
                  onChange={(event) => setTerminalInput(event.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Enter a portfolio terminal command"
                />
                <button type="submit">RUN</button>
              </form>
            </div>
          )}
          {activeTab === 'arcade' && (
            <div className="hub-arcade">
              <div className="hub-arcade-heading">
                <div><span>MINI GAME / 001</span><h3>Catch the Core</h3></div>
                <div className="hub-arcade-score" aria-live="polite"><b>{String(score).padStart(2, '0')}</b><span>POINTS</span></div>
              </div>
              <div className="hub-arcade-board">
                {playing ? (
                  <button
                    type="button"
                    className="hub-arcade-orb"
                    style={{ left: `${orbPosition.x}%`, top: `${orbPosition.y}%` }}
                    onClick={hitOrb}
                    aria-label="Catch the glowing core"
                  />
                ) : (
                  <div className="hub-arcade-prompt">
                    <span>{secondsLeft === 0 ? 'RUN COMPLETE' : 'READY PLAYER ONE?'}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setScore(0);
                        setSecondsLeft(20);
                        setPlaying(true);
                      }}
                    >
                      {secondsLeft === 0 ? 'PLAY AGAIN' : 'START GAME'}
                    </button>
                  </div>
                )}
              </div>
              <div className="hub-arcade-footer"><span>TIME / {String(secondsLeft).padStart(2, '0')}s</span><span>HIT 12 CORES TO UNLOCK A BADGE</span></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExperienceHub;
