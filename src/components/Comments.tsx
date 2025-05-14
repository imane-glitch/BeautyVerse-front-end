import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comments.css';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  post: {
    id: number;
    title: string;
    content: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    like_count: string;
    link: string | null;
    slug: string;
  };
  author: any | null;
  user: any | null;
}

interface CommentsProps {
  postId: number;
  formatTimeAgo: (date: string) => string;
}

const Comments: React.FC<CommentsProps> = ({ postId, formatTimeAgo }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:1337/api/comments`, {
        params: {
          'filters[post][id][$eq]': postId,
          'populate': '*',
          'sort': 'createdAt:desc'
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response from comments API:', response.data);

      if (response.data && response.data.data) {
        setComments(response.data.data);
        console.log('Comments data:', response.data.data);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des commentaires:', err);
      setError('Impossible de charger les commentaires');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:1337/api/comments',
        {
          data: {
            content: newComment,
            post: postId,
            publishedAt: new Date().toISOString()
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('New comment response:', response.data);
      setNewComment('');
      await fetchComments();
    } catch (err) {
      console.error('Erreur lors de l\'ajout du commentaire:', err);
      setError('Impossible d\'ajouter le commentaire');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comments-section">
      <h3>Commentaires</h3>

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="comment-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="submit-comment-button"
          disabled={loading || !newComment.trim()}
        >
          {loading ? 'Envoi...' : 'Commenter'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">Aucun commentaire pour le moment</p>
        ) : (
          comments.map((comment) => {
            console.log('Rendering comment:', comment);
            return (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">
                    {'Utilisateur anonyme'}
                  </span>
                  <span className="comment-time">
                    {formatTimeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Comments; 