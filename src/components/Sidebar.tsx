import React, { useState } from 'react';
import './Sidebar.css'; // CSS combiné

type SectionProps = {
  title: string;
  children?: React.ReactNode;
};

const SidebarSection: React.FC<SectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="sidebar-section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title.toUpperCase()}</span>
        <span className={`chevron ${isOpen ? 'open' : ''}`}>⌄</span>
      </div>
      {isOpen && <div className="section-content">{children}</div>}
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        <li className="sidebar-item">Accueil</li>
        <li className="sidebar-item">Explorer</li>
        <li className="sidebar-item">Plus</li>
      </ul>

      <SidebarSection title="Thématiques">
        <span className="plus-icon"></span> Culture internet
        <span className="custom-feed-button"></span> Mode
        <span className="custom-feed-button"></span> Musique
        <span className="custom-feed-button"></span> Jeux vidéo
        <span className="custom-feed-button"></span> Films
        <span className="custom-feed-button"></span> Séries
      </SidebarSection>

      <SidebarSection title="Ressources">
      <span className="plus-icon"></span> A propos
        <span className="custom-feed-button"></span> Aide
        <span className="custom-feed-button"></span> Blog
        <span className="custom-feed-button"></span> Carrières
        <span className="custom-feed-button"></span> Presse
      </SidebarSection>
    </div>
  );
};

export default Sidebar;

