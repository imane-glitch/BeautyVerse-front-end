import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PostPreview from '../components/PostPreview';
import './SearchResults.css';

interface Block {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  url: string;
}

interface Post {
  id: number;
  title: string;
  content: string | Block[];
  createdAt: string;
  publishedAt: string;
  like_count: number;
  link?: string;
  user: {
    id: number;
    username: string;
  } | null;
  subreddit: {
    id: number;
    name: string;
  } | null;
  image: ImageData[] | null;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:1337/api/posts', {
          params: {
            'filters[$or][0][title][$containsi]': query,
            'filters[$or][1][content][$containsi]': query,
            'filters[$or][2][subreddit][name][$containsi]': query,
            'populate': '*'
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Réponse de recherche:', response.data);

        if (response.data && response.data.results) {
          setPosts(response.data.results);
        }
      } catch (err) {
        console.error('Erreur lors de la recherche:', err);
        setError('Une erreur est survenue lors de la recherche');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setPosts([]);
      setLoading(false);
    }
  }, [query]);

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'à l\'instant';
    if (diffInSeconds < 3600) return `il y a ${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `il y a ${Math.floor(diffInSeconds / 3600)} heures`;
    return `il y a ${Math.floor(diffInSeconds / 86400)} jours`;
  };

  return (
    <div className="search-results">
      <h2>Résultats pour : {query}</h2>
      
      {loading && <div className="loading">Recherche en cours...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && posts.length === 0 && (
        <div className="no-results">Aucun résultat trouvé pour "{query}"</div>
      )}
      
      {posts.map((post) => (
        <PostPreview
          key={post.id}
          post={post}
          formatTimeAgo={formatTimeAgo}
        />
      ))}
    </div>
  );
};

export default SearchResults; 