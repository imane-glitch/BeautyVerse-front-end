import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import CreatePostButton from './CreatePostButton';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="left-section" onClick={handleTitleClick}>
          <img src="/img/logo.png" alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">OnSeDit</h1>
        </div>
        
        <div className="center-section">
          <input 
            type="text" 
            placeholder="Search..." 
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
