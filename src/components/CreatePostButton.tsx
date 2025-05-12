import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePostButton.css';

const CreatePostButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/submit');
  };

  return (
    <button 
      className="create-post-button"
      onClick={handleClick}
    >
      <span className="button-icon">✎</span>
      <span className="button-text">Créer un post</span>
    </button>
  );
};

export default CreatePostButton; 