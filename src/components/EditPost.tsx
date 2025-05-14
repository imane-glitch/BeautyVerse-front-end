import React, { useState } from 'react';
import axios from 'axios';
import './PostForm.css';

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
          data: { 
            title,
            content: content ? [
              {
                type: "paragraph",
                children: [
                  {
                    text: content,
                    type: "text"
                  }
                ]
              }
            ] : null
          },
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
    <div className="form-container">
      <h2>Modifier le post</h2>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          placeholder="Nouveau titre"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Nouveau contenu"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default EditPost;
