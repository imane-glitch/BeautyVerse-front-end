import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import CreatePostButton from './CreatePostButton.tsx';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="left-section" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
          <img src="/img/Capture d'écran 2025-05-12 à 14.33.03.png" alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">OnSeDit</h1>
        </div>
        
        <div className="center-section">
          <input 
            type="text" 
            placeholder=" Search..." 
            className="search-input"
          />
        </div>

        <div className="right-section">
          <CreatePostButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
