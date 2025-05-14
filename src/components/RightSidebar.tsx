import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RightSidebar.css';

interface Block {
  type: string;
  children: Array<{
    text: string;
    type: string;
  }>;
}

interface SubredditData {
  id: number;
  documentId: string;
  name: string;
  description: Block[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const RightSidebar: React.FC = () => {
  const [subreddits, setSubreddits] = useState<SubredditData[]>([]);
  const [error, setError] = useState<string>('');

  const parseDescription = (blocks: Block[] | null): string => {
    if (!blocks || !Array.isArray(blocks)) {
      return 'Aucune description';
    }

    return blocks
      .map(block => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          return block.children
            .map(child => child.text || '')
            .join('');
        }
        return '';
      })
      .filter(text => text.length > 0)
      .join('\n');
  };

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

        console.log('Response data structure:', JSON.stringify(response.data, null, 2));

        if (response.data?.data) {
          const transformedData = response.data.data.map((item: any) => {
            if (!item || typeof item !== 'object') {
              console.error('Invalid item structure:', item);
              return null;
            }

            console.log('Processing item:', item);

            return {
              id: item.id || 0,
              documentId: item.documentId || '',
              name: item.name || 'Sans nom',
              description: Array.isArray(item.description) 
                ? item.description 
                : null,
              createdAt: item.createdAt || '',
              updatedAt: item.updatedAt || '',
              publishedAt: item.publishedAt || ''
            };
          }).filter(Boolean);

          console.log('Transformed data:', transformedData);
          setSubreddits(transformedData);
        } else {
          console.error('Invalid response structure:', response.data);
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
                      {parseDescription(subreddit.description)}
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