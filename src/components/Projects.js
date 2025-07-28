import React from "react";
import "./Projects.css";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCode,
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
} from "react-icons/fa";

const projects = [
  {
    title: "Multi Lingual chatroom",
    description:
      "Flask-powered global chatroom with real-time messaging and automatic language translation. Users worldwide can communicate simultaneously in their preferred languages, with messages automatically translated using Google Translate API for barrier-free international conversations.",
    tools: "Flask, googletrans library",
    button: true,
    link: "https://github.com/PrinceBazad/Multi_Lingual_Chatroom/",
  },
  {
    title: "Hotel website",
    description:"A hotel management system  enables guests to check room availability in real-time, make secure bookings with cash payment options, and access personalized account dashboards through user authentication. The system provides a seamless booking experience with user login functionality for viewing reservation details and managing bookings.",
    tools: "HTML, CSS, JavaScript, PHP",
    button: true,
    link: "https://github.com/PrinceBazad/hotel/",
  },
  {
    title: "Stock Market Analyzer",
    description:
      "AI-powered stock market analysis platform with React frontend and Flask backend. Integrates Polygon.io for real-time stock data and OpenAI for intelligent insights, enabling users to query stocks in natural language and receive AI-driven investment recommendations with interactive charts.",
    tools: "HTML, CSS, JavaScript, Python , React ,Json",
    button: true,
    link: "https://github.com/PrinceBazad/Stock_analyzer/",
  },
  {
    title: "IFFCO Branch(Azad)",
    description:
      "Django-based corporate website for Azad branch with dynamic content management. Features include news updates, product/service listings, branch information, and team member profiles, all managed through a comprehensive admin dashboard with full CRUD operations for authorized users.",
    tools: "HTML, CSS, JavaScript, Django",
    button: true,
    link: "https://github.com/PrinceBazad/AZADCOOPERATIVE.in/",
  },
];

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span className="project-tools">Tools Used: {project.tools}</span>
            {project.button && project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <span className="current-badge">GitHub</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
