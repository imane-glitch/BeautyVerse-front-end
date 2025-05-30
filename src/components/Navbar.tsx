import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import CreatePostButton from './CreatePostButton';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="left-section" onClick={handleTitleClick}>
          <img 
            src="/img/logo.png"
            alt="Logo"
            width="40"
            height="40"
            style={{ marginRight: '10px' }}
          />
          <h1 className="navbar-title">OnSeDit</h1>
        </div>
        
        <div className="center-section">
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <div className="right-section">
          <CreatePostButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
