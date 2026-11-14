import React, { useCallback, useState } from "react";
import "./Projects.css";
import ProjectPortal from "./ProjectPortal";

const projects = [
  {
    id: 'chatroom',
    title: "Multi Lingual chatroom",
    description:
      "Flask-powered global chatroom with real-time messaging and automatic language translation. Users worldwide can communicate simultaneously in their preferred languages, with messages automatically translated using Google Translate API for barrier-free international conversations.",
    tools: "Flask, googletrans library",
    button: true,
    link: "https://github.com/PrinceBazad/Multi_Lingual_Chatroom/",
    preview: "chat",
  },
  {
    id: 'hotel',
    title: "Hotel website",
    description:"A hotel management system  enables guests to check room availability in real-time, make secure bookings with cash payment options, and access personalized account dashboards through user authentication. The system provides a seamless booking experience with user login functionality for viewing reservation details and managing bookings.",
    tools: "HTML, CSS, JavaScript, PHP",
    button: true,
    link: "https://github.com/PrinceBazad/hotel/",
    preview: "hotel",
  },
  {
    id: 'stock-analyzer',
    title: "Stock Market Analyzer",
    description:
      "AI-powered stock market analysis platform with React frontend and Flask backend. Integrates Polygon.io for real-time stock data and OpenAI for intelligent insights, enabling users to query stocks in natural language and receive AI-driven investment recommendations with interactive charts.",
    tools: "HTML, CSS, JavaScript, Python , React ,Json",
    button: true,
    link: "https://github.com/PrinceBazad/Stock_analyzer/",
    preview: "stock",
  },
  {
    id: 'iffco',
    title: "IFFCO Branch(Azad)",
    description:
      "Django-based corporate website for Azad branch with dynamic content management. Features include news updates, product/service listings, branch information, and team member profiles, all managed through a comprehensive admin dashboard with full CRUD operations for authorized users.",
    tools: "HTML, CSS, JavaScript, Django",
    button: true,
    link: "https://github.com/PrinceBazad/AZADCOOPERATIVE.in/",
    preview: "corporate",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const closeProjectPortal = useCallback(() => setSelectedProject(null), []);

  const handleCardPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width;
    const pointerY = (event.clientY - bounds.top) / bounds.height;

    event.currentTarget.style.setProperty('--pointer-x', `${pointerX * 100}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${pointerY * 100}%`);
    event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - pointerY) * 7}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(pointerX - 0.5) * 8}deg`);
  };

  const resetCardTilt = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map((project, idx) => (
          <div
            className="project-card"
            id={`project-${project.id}`}
            key={project.id}
            onPointerMove={handleCardPointerMove}
            onPointerLeave={resetCardTilt}
          >
            <div className="project-card-foil" aria-hidden="true" />
            <div className="project-card-meta">
              <span>PROJECT / 0{idx + 1}</span>
              <span className="project-card-status"><i /> OPEN SOURCE</span>
            </div>
            <div className={`project-preview preview-${project.preview}`} aria-hidden="true">
              <div className="preview-browser-bar">
                <i /><i /><i />
                <span>princebazad.dev / {project.preview}</span>
              </div>
              {project.preview === "chat" && (
                <div className="preview-chat">
                  <div className="preview-chat-users"><i /><i /><i /><i /></div>
                  <div className="preview-chat-messages">
                    <span /><b /><span /><b />
                  </div>
                </div>
              )}
              {project.preview === "hotel" && (
                <div className="preview-hotel">
                  <div className="preview-hotel-building"><i /><i /><i /><i /><i /><i /></div>
                  <div className="preview-hotel-copy"><b>AZAD GRAND</b><span>Find your next stay</span><i /></div>
                </div>
              )}
              {project.preview === "stock" && (
                <div className="preview-stock">
                  <div><b>MARKET / LIVE</b><strong>+8.42%</strong></div>
                  <svg viewBox="0 0 240 60" preserveAspectRatio="none">
                    <path d="M0 49 C16 42 21 51 35 38 S58 44 74 31 S93 40 112 22 S143 34 159 14 S188 29 204 10 S225 20 240 4" />
                  </svg>
                </div>
              )}
              {project.preview === "corporate" && (
                <div className="preview-corporate">
                  <strong>AZAD<span>COOPERATIVE</span></strong>
                  <div className="preview-corporate-banner"><b>GROWING TOGETHER</b><i /></div>
                  <div className="preview-corporate-lines"><i /><i /><i /></div>
                </div>
              )}
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span className="project-tools">Tools Used: {project.tools}</span>
            <div className="project-card-actions">
              <button type="button" className="project-portal-trigger" onClick={() => setSelectedProject(project)}>
                Enter project portal
              </button>
              {project.button && project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <span className="current-badge">GitHub</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedProject && (
        <ProjectPortal project={selectedProject} onClose={closeProjectPortal} />
      )}
    </section>
  );
};

export default Projects;
