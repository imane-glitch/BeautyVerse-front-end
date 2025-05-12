import React from 'react';
import './Navbar.css';

type NavbarProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <img src="/imgg/Capture d’écran 2025-05-12 à 14.33.03.png" alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">OnSeDit</h1>
        <input 
          type="text" 
          placeholder=" Search..." 
          className="search-input"
        />

        <div className="auth-buttons">
          <button onClick={onLoginClick}>Se connecter</button>
          <button onClick={onRegisterClick}>S'inscrire</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
