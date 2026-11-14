import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowRight, FaBolt, FaEnvelope, FaGamepad, FaHome, FaSearch, FaUser, FaTimes } from 'react-icons/fa';
import resumePDF from '../myphoto/Princebazad.pdf';
import './CommandPalette.css';

const navigationCommands = [
  { label: 'Go to home', section: 'hero', keywords: 'intro top', icon: <FaHome /> },
  { label: 'Explore skills', section: 'skills', keywords: 'technology stack', icon: <FaBolt /> },
  { label: 'View projects', section: 'projects', keywords: 'work portfolio github', icon: <FaUser /> },
  { label: 'Get in touch', section: 'contact', keywords: 'email contact message', icon: <FaEnvelope /> },
];

const projectCommands = [
  { label: 'Open chatroom project', target: 'project-chatroom', keywords: 'flask multi lingual translation' },
  { label: 'Open hotel project', target: 'project-hotel', keywords: 'booking php hotel website' },
  { label: 'Open stock analyzer', target: 'project-stock-analyzer', keywords: 'stock market ai react analyzer' },
  { label: 'Open IFFCO project', target: 'project-iffco', keywords: 'django azad cooperative' },
];

const scrollToElement = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }
};

const CommandPalette = ({ open, onClose, onOpen, onToggleChaos, onOpenExperiences }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => [
    ...navigationCommands.map((command) => ({
      ...command,
      action: () => scrollToElement(command.section),
    })),
    ...projectCommands.map((command) => ({
      ...command,
      icon: <FaUser />,
      action: () => scrollToElement(command.target),
    })),
    {
      label: 'Open my resume',
      keywords: 'pdf cv experience',
      icon: <FaUser />,
      action: () => window.open(resumePDF, '_blank', 'noopener,noreferrer'),
    },
    {
      label: 'Toggle chaos mode',
      keywords: 'easter egg secret fun',
      icon: <FaBolt />,
      action: onToggleChaos,
    },
    {
      label: 'Open experiences hub',
      keywords: 'desktop os terminal arcade game play',
      icon: <FaGamepad />,
      action: onOpenExperiences,
    },
  ], [onToggleChaos, onOpenExperiences]);

  const filteredCommands = commands.filter((command) =>
    `${command.label} ${command.keywords}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  useEffect(() => {
    if (!open) return undefined;

    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpen();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [onOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  if (!open) return null;

  const runCommand = (command) => {
    onClose();
    command.action();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % Math.max(filteredCommands.length, 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
    } else if (event.key === 'Enter' && filteredCommands[activeIndex]) {
      event.preventDefault();
      runCommand(filteredCommands[activeIndex]);
    }
  };

  return (
    <div
      className="command-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title">
        <div className="command-search">
          <FaSearch aria-hidden="true" />
          <label className="sr-only" htmlFor="command-search-input">Search portfolio commands</label>
          <input
            ref={inputRef}
            id="command-search-input"
            type="text"
            value={query}
            placeholder="Search pages, projects, actions..."
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            autoComplete="off"
          />
          <button type="button" className="command-close" onClick={onClose} aria-label="Close command palette">
            <FaTimes aria-hidden="true" />
          </button>
        </div>
        <div className="command-heading">
          <h2 id="command-title">QUICK NAVIGATION</h2>
          <span>{filteredCommands.length} COMMANDS</span>
        </div>
        <div className="command-list" role="listbox" aria-label="Portfolio commands">
          {filteredCommands.length ? filteredCommands.map((command, index) => (
            <button
              type="button"
              role="option"
              aria-selected={activeIndex === index}
              className={`command-item${activeIndex === index ? ' active' : ''}`}
              key={command.label}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => runCommand(command)}
            >
              <span className="command-item-icon" aria-hidden="true">{command.icon}</span>
              <span>{command.label}</span>
              <FaArrowRight className="command-item-arrow" aria-hidden="true" />
            </button>
          )) : (
            <p className="command-empty">No commands match “{query}”. Try another search.</p>
          )}
        </div>
        <div className="command-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </section>
    </div>
  );
};

export default CommandPalette;
