import React, { useState } from 'react';
import axios from 'axios';
import './PostForm.css';

axios.defaults.baseURL = 'http://localhost:1337/';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        '/api/posts',
        { data: { title, content } },
        {
          headers: {
            Authorization: Bearer ${token},
          },
        }
      );
      alert('Post créé !');
    } catch (err) {
      alert('Erreur lors de la création du post');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Créer un post</h2>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Titre" onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Contenu" onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default CreatePost;
