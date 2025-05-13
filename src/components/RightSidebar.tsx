import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RightSidebar.css';

interface SubredditData {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const RightSidebar: React.FC = () => {
  const [subreddits, setSubreddits] = useState<SubredditData[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Vous devez être connecté pour voir les communautés');
          return;
        }

        const response = await axios.get('http://localhost:1337/api/subreddits', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Réponse API subreddits brute:', response.data);

        if (response.data && Array.isArray(response.data.data)) {
          // Transformation des données pour correspondre à notre structure
          const transformedData = response.data.data.map((item: any) => {
            // Gestion spéciale de la description
            let description = 'Aucune description';
            if (item.description) {
              if (Array.isArray(item.description)) {
                // Si c'est un tableau, on prend le premier élément ou on utilise une valeur par défaut
                description = item.description[0]?.toString() || 'Aucune description';
              } else {
                description = item.description.toString();
              }
            }

            return {
              id: item.id,
              documentId: item.documentId,
              name: item.name || item.title || 'Sans nom',
              description: description,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              publishedAt: item.publishedAt
            };
          });

          console.log('Données transformées:', transformedData);
          setSubreddits(transformedData);
        } else {
          setError('Format de données incorrect');
        }
      } catch (err) {
        console.error('Erreur lors du chargement des subreddits:', err);
        setError('Erreur lors du chargement des communautés');
      }
    };

    fetchSubreddits();
  }, []);

  return (
    <div className="right-sidebar">
      <div className="communities-section">
        <h2>Communautés</h2>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="communities-list">
            {!subreddits || subreddits.length === 0 ? (
              <p className="no-communities">Aucune communauté trouvée</p>
            ) : (
              subreddits.map((subreddit) => {
                console.log('Rendu subreddit:', subreddit);
                return (
                  <div key={subreddit.id} className="community-item">
                    <div className="community-icon">r/</div>
                    <div className="community-info">
                      <h3 className="community-name">
                        {subreddit.name}
                      </h3>
                      <p className="community-description">
                        {subreddit.description}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar; 