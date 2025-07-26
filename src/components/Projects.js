import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Multi-user-chatroom',
    description: 'Developed a chatroom where multiple users can simultaneously chat with each other from all over the world in different languages. The chats are seen in the particular language selected by the user.',
    tools: 'Flask, googletrans library',
  },
  {
    title: 'Sunset-Hotel-Website',
    description: 'Developed an interface as well as backend for the website in which the users are able to book the room via cash and check the availability of the room and also login to see the details.',
    tools: 'HTML, CSS, JavaScript, PHP',
  },
  {
    title: 'Quick-chat',
    description: 'Developed a chat website that allows users to chat with each other in a secure way, send friend requests, and get notified when the user responds to your request.',
    tools: 'HTML, CSS, JavaScript, SQL, PHP',
  },
  {
    title: 'IFFCO Branch ',
    description: 'A company site  where users can see news, updates, products, and services provided by the company branch. Users can also see the list of members/Directors. All these things are managed, added, updated, and deleted by the admin or super user.',
    tools: 'HTML, CSS, JavaScript, Django (framework)',
    current: true,
  },
];

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
            <h3>{project.title} {project.current && <span className="current-badge">Pending</span>}</h3>
            <p>{project.description}</p>
            <span className="project-tools">Tools Used: {project.tools}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects; 