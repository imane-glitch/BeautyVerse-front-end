import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button 
      className="logout-button"
      onClick={handleLogout}
    >
      <span className="button-icon">↪</span>
      <span className="button-text">Se déconnecter</span>
    </button>
  );
};

export default LogoutButton; 