import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import './ProjectPortal.css';

const ProjectDemo = ({ project }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    'Hey! Are we talking across languages?',
    'Yep — the demo chat is ready to translate ✨',
  ]);
  const [roomReserved, setRoomReserved] = useState(false);
  const [symbol, setSymbol] = useState('NVDA');
  const [corporateTab, setCorporateTab] = useState('News');

  if (project.preview === 'chat') {
    const sendMessage = (event) => {
      event.preventDefault();
      const trimmedMessage = message.trim();
      if (!trimmedMessage) return;
      setMessages((current) => [...current.slice(-3), trimmedMessage]);
      setMessage('');
    };

    return (
      <div className="portal-demo portal-chat-demo">
        <span className="portal-demo-label">LIVE CHAT / SANDBOX</span>
        <div className="portal-chat-messages" aria-live="polite">
          {messages.map((item, index) => <p key={`${item}-${index}`}>{item}</p>)}
        </div>
        <form onSubmit={sendMessage}>
          <label className="sr-only" htmlFor="portal-chat-input">Write a demo message</label>
          <input
            id="portal-chat-input"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type a message..."
            maxLength={120}
          />
          <button type="submit" aria-label="Send demo message"><FaArrowRight /></button>
        </form>
        <small>Local demo only — nothing is sent to a server.</small>
      </div>
    );
  }

  if (project.preview === 'hotel') {
    return (
      <div className="portal-demo portal-hotel-demo">
        <span className="portal-demo-label">AZAD GRAND / ROOM 204</span>
        <div className="portal-hotel-room">
          <span aria-hidden="true">✦</span>
          <div><b>Deluxe garden suite</b><small>2 guests · 1 night · breakfast included</small></div>
          <strong>₹6,400</strong>
        </div>
        <button type="button" className="portal-demo-action" onClick={() => setRoomReserved((value) => !value)}>
          {roomReserved ? 'Release demo room' : 'Reserve demo room'}
        </button>
        <p className="portal-demo-feedback" aria-live="polite">
          {roomReserved ? 'Demo reservation held locally — no booking was made.' : 'Try a sample interaction; this does not contact a hotel.'}
        </p>
      </div>
    );
  }

  if (project.preview === 'stock') {
    const stockValues = { NVDA: '+8.42%', AAPL: '+2.16%', MSFT: '-0.74%' };
    return (
      <div className="portal-demo portal-stock-demo">
        <span className="portal-demo-label">MARKET LAB / SAMPLE DATA</span>
        <div className="portal-stock-result">
          <b>{symbol}</b>
          <strong className={stockValues[symbol].startsWith('-') ? 'negative' : ''}>{stockValues[symbol]}</strong>
        </div>
        <svg viewBox="0 0 360 96" role="img" aria-label={`Illustrative ${symbol} market trend`}>
          <path d="M4 78 C28 72 35 82 62 60 S95 71 117 44 S152 60 177 33 S209 48 235 28 S273 40 295 17 S332 29 356 8" />
        </svg>
        <div className="portal-stock-symbols" role="group" aria-label="Choose sample stock">
          {Object.keys(stockValues).map((value) => (
            <button type="button" key={value} aria-pressed={symbol === value} onClick={() => setSymbol(value)}>{value}</button>
          ))}
        </div>
        <small>Illustrative sample only — not live prices or financial advice.</small>
      </div>
    );
  }

  const corporateContent = {
    News: 'Latest branch updates and community announcements.',
    Services: 'Agriculture support, local services, and member resources.',
    Branch: 'Azad branch information, people, and ways to get in touch.',
  };

  return (
    <div className="portal-demo portal-corporate-demo">
      <span className="portal-demo-label">AZADCOOPERATIVE / PREVIEW</span>
      <div className="portal-corporate-tabs" role="tablist" aria-label="Corporate site preview">
        {Object.keys(corporateContent).map((tab) => (
          <button
            type="button"
            key={tab}
            role="tab"
            aria-selected={corporateTab === tab}
            onClick={() => setCorporateTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="portal-corporate-content" role="tabpanel">{corporateContent[corporateTab]}</div>
      <small>Interactive local preview — content is illustrative.</small>
    </div>
  );
};

const ProjectPortal = ({ project, onClose }) => {
  const closeButtonRef = useRef(null);

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

  return (
    <div
      className="project-portal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="project-portal-dialog" role="dialog" aria-modal="true" aria-labelledby="project-portal-title">
        <header className="project-portal-header">
          <span>PROJECT PORTAL / {project.preview.toUpperCase()}</span>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close project portal">
            <FaTimes />
          </button>
        </header>
        <div className="project-portal-layout">
          <div className="project-portal-copy">
            <span className="project-portal-kicker">INTERACTIVE CASE STUDY</span>
            <h2 id="project-portal-title">{project.title}</h2>
            <p>{project.description}</p>
            <span className="project-portal-tools">{project.tools}</span>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Explore the source <FaArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="project-portal-stage">
            <div className="project-portal-orb" aria-hidden="true" />
            <ProjectDemo project={project} />
          </div>
        </div>
        <div className="project-portal-footer">
          <span>LOCAL INTERACTION / NO EXTERNAL DATA</span>
          <span>ESC TO EXIT</span>
        </div>
      </section>
    </div>
  );
};

export default ProjectPortal;
