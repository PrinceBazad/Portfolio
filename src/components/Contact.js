import React, { useState } from 'react';
import './Contact.css';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaCode, FaMapMarkerAlt, FaClock, FaBriefcase } from 'react-icons/fa';

const Contact = () => {
  const [activeCard, setActiveCard] = useState(null);

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'princebazad3@gmail.com',
      link: 'mailto:princebazad3@gmail.com',
      color: '#e74c3c',
      description: 'Send me an email'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+91 8572880980',
      link: 'tel:+918572880980',
      color: '#27ae60',
      description: 'Call me directly'
    },
    {
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      value: 'prince-bazad-3a2410274',
      link: 'https://www.linkedin.com/in/prince-bazad-3a2410274/',
      color: '#0077b5',
      description: 'Connect professionally'
    },
    {
      icon: <FaGithub />,
      title: 'GitHub',
      value: 'PrinceBazad',
      link: 'https://github.com/PrinceBazad',
      color: '#333',
      description: 'View my projects'
    },
    {
      icon: <FaCode />,
      title: 'LeetCode',
      value: 'prince_bazad',
      link: 'https://leetcode.com/u/prince_bazad/',
      color: '#ffa116',
      description: 'Check my solutions'
    },
    {
      icon: <FaBriefcase />,
      title: 'Freelancer',
      value: 'PrinceBazad',
      link: 'https://www.freelancer.in/u/PrinceBazad',
      color: '#29b2fe',
      description: 'Hire me for projects'
    }
  ];

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const handleCardHover = (index) => {
    if (activeCard === null) {
      setActiveCard(index);
    }
  };

  return (
    <section className="contact" id="contact">
      <h2>Get In Touch</h2>
      <p className="contact-subtitle">Let's connect and build something amazing together!</p>
      
      <div className="contact-grid">
        {contactInfo.map((contact, index) => (
          <div
            key={index}
            className={`contact-card ${activeCard === index ? 'active' : ''}`}
            onClick={() => handleCardClick(index)}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={() => setActiveCard(null)}
            style={{ '--card-color': contact.color }}
          >
            <div className="contact-icon">
              {contact.icon}
            </div>
            <div className="contact-content">
              <h3>{contact.title}</h3>
              <p className="contact-value">{contact.value}</p>
              <p className="contact-description">{contact.description}</p>
            </div>
            <div className="contact-overlay">
              <a href={contact.link} target="_blank" rel="noopener noreferrer" className="contact-link">
                {contact.title === 'Email' || contact.title === 'Phone' ? 'Open' : 'Visit'}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-extra">
        <div className="contact-status">
          <FaClock className="status-icon" />
          <div className="status-content">
            <h4>Available for</h4>
            <p>Freelance Projects • Full-time Opportunities • Collaborations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 