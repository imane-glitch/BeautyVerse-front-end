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
        <h1 className="navbar-title">OnSeDit</h1>
        <input 
          type="text" 
          placeholder=" Search..." 
          className="search-input"
        />

        <div className="auth-buttons">
        <button className="create-post-button">Créer un post</button> 
          <button onClick={onLoginClick}>Se connecter</button>
          <button onClick={onRegisterClick}>S'inscrire</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


