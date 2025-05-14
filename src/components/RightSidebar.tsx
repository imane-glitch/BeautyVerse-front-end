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

interface BlockText {
  type: 'text';
  text: string;
}

interface BlockParagraph {
  type: 'paragraph';
  children: BlockText[];
}

type Block = BlockParagraph;

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

        if (response.data && Array.isArray(response.data.data)) {
          const transformedData = response.data.data.map((item: any) => ({
            id: item.id,
            documentId: item.documentId || '',
            name: item.name || 'Sans nom',
            description: parseDescription(item.description),
            createdAt: item.createdAt || '',
            updatedAt: item.updatedAt || '',
            publishedAt: item.publishedAt || ''
          }));

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
                      {subreddit.description || 'Aucune description'}
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