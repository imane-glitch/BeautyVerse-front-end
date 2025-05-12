import React from 'react';
import './Navbar.css';
import CreatePostButton from './CreatePostButton.tsx';

type NavbarProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="left-section">
          <img src="/img/Capture d’écran 2025-05-12 à 14.33.03.png" alt="Logo" className="navbar-logo" />
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
          <div className="auth-buttons">
            <button onClick={onLoginClick}>Se connecter</button>
            <button onClick={onRegisterClick}>S'inscrire</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
