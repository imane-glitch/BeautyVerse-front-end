import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './Sidebar.css'; // CSS combiné
import CreateSubreddit from './CreateSubreddit';

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
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <div className="sidebar">
        <ul className="sidebar-links">
          <li className="sidebar-item">
            <Icon icon="mdi:home" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
            Accueil
          </li>
          <li className="sidebar-item">
            <Icon icon="mdi:magnify" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
            Explorer
          </li>
          <li className="sidebar-item">
            <Icon icon="mdi:dots-horizontal" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
            Plus
          </li>
        </ul>

        <SidebarSection title="Thématiques">
          <span className="custom-feed-button"></span> Culture internet
          <span className="custom-feed-button"></span> Mode
          <span className="custom-feed-button"></span> Musique
          <span className="custom-feed-button"></span> Jeux vidéo
          <span className="custom-feed-button"></span> Films
          <span className="custom-feed-button"></span> Séries
        </SidebarSection>

        <SidebarSection title="Ressources">
          <span className="custom-feed-button"></span> A propos
          <span className="custom-feed-button"></span> Aide
          <span className="custom-feed-button"></span> Contact
          <span className="custom-feed-button"></span> Blog
          <span className="custom-feed-button"></span> Carrières
          <span className="custom-feed-button"></span> Presse
        </SidebarSection>

        <SidebarSection title="Communautés">
          <button
            className="create-community-button"
            onClick={() => setShowCreateModal(true)}
          >
            <Icon icon="mdi:plus" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
            Créer une communauté
          </button>

          <span className="custom-feed-button"></span> A propos
        </SidebarSection>
      </div>

      {showCreateModal && <CreateSubreddit onClose={() => setShowCreateModal(false)} />}
    </>
  );
};

export default Sidebar;

