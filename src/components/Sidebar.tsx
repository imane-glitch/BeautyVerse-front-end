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
      <button className="custom-feed-button">
        <span className="plus-icon"></span> Culture internet</button>
        <span className="custom-feed-button">Mode</span>
        <span className="custom-feed-button">Musique</span>
        <span className="custom-feed-button">Jeux vidéo</span>
        <span className="custom-feed-button">Films</span>
        <span className="custom-feed-button">Séries</span>
      </SidebarSection>

      <SidebarSection title="Resources">
        <button className="custom-feed-button">A propos</button>
        <button className="custom-feed-button">Aide</button>
        <button className="custom-feed-button">Blog</button>
        <button className="custom-feed-button">Carrières</button>
        <button className="custom-feed-button">Presse</button>
      </SidebarSection>
    </div>
  );
};

export default Sidebar;

