import React, { useState } from 'react';
import axios from 'axios';
import './CreateSubreddit.css';

interface CreateSubredditProps {
  onClose: () => void;
}

const CreateSubreddit: React.FC<CreateSubredditProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté pour créer une communauté');
      }

      // Formatage du nom pour inclure "r/" si ce n'est pas déjà le cas
      const formattedName = name.startsWith('r/') ? name : `r/${name}`;

      const response = await axios.post(
        'http://localhost:1337/api/subreddits',
        {
          data: {
            name: formattedName,
            description,
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      setSuccess(true);
      setName('');
      setDescription('');
      console.log('Subreddit créé:', response.data);
      
      // Fermer le modal après 2 secondes en cas de succès
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || err.message || 'Une erreur est survenue');
      console.error('Erreur lors de la création du subreddit:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-subreddit-modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Créer une communauté</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Communauté créée avec succès!</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom de la communauté</label>
            <div className="input-prefix">
              r/
              <input
                type="text"
                id="name"
                value={name.startsWith('r/') ? name.slice(2) : name}
                onChange={(e) => setName(e.target.value)}
                placeholder="nom_de_la_communaute"
                required
                pattern="[a-zA-Z0-9_]{3,21}"
                title="Le nom doit contenir entre 3 et 21 caractères (lettres, chiffres et underscores uniquement)"
                disabled={isLoading}
              />
            </div>
            <small>
              Les noms de communauté doivent être en minuscules, entre 3 et 21 caractères,
              et ne peuvent contenir que des lettres, des chiffres et des underscores.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <div className="textarea-wrapper">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre communauté..."
              rows={4}
              required
              disabled={isLoading}
            />
            </div>
          </div>


          <div className="button-group">
            <button 
              type="button" 
              className="cancel-button"
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="create-button"
              disabled={isLoading}
            >
              {isLoading ? 'Création...' : 'Créer la communauté'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubreddit; 