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

        console.log('Réponse API subreddits brute:', JSON.stringify(response.data, null, 2));

        if (response.data && Array.isArray(response.data.data)) {
          const transformedData = response.data.data.map((item: any) => {
            // Gestion de la description
            let description = 'Aucune description';
            if (item.description) {
              if (Array.isArray(item.description)) {
                description = item.description
                  .map((block: any) => {
                    if (block.children) {
                      return block.children
                        .map((child: any) => child.text || '')
                        .join('');
                    }
                    return '';
                  })
                  .join('\n')
                  .trim();
              } else if (typeof item.description === 'string') {
                description = item.description;
              }
            }

            return {
              id: item.id,
              documentId: item.documentId || '',
              name: item.name || 'Sans nom',
              description: description || 'Aucune description',
              createdAt: item.createdAt || '',
              updatedAt: item.updatedAt || '',
              publishedAt: item.publishedAt || ''
            };
          });

          console.log('Données transformées:', JSON.stringify(transformedData, null, 2));
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
              subreddits.map((subreddit) => (
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar; 