import React, { useState } from 'react';
import axios from 'axios';
import './EditPost.css';

axios.defaults.baseURL = 'http://localhost:1337';

interface EditPostProps {
  postId: number;
}

function EditPost({ postId }: EditPostProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `/api/posts/${postId}`,
        {
          data: { title, content },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Post modifié avec succès !');
    } catch (err) {
      alert('Erreur lors de la modification du post');
      console.error(err);
    }
  };

  return (
    <div className="edit-post-container">
      <form className="edit-post-form" onSubmit={handleEdit}>
        <h2 className="edit-post-title">Modifier le post</h2>
        <input
          type="text"
          placeholder="Nouveau titre"
          className="edit-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Nouveau contenu"
          className="edit-post-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="edit-post-button">
          Modifier
        </button>
      </form>
    </div>
  );
}

export default EditPost;
