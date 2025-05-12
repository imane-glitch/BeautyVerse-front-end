import React, { useState } from 'react';
import axios from 'axios';
import '../components/PostForm.css';

axios.defaults.baseURL = 'http://localhost:1337';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('text');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        '/api/posts',
        { data: { title, content } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      <h2>Create post</h2>
      <div className="community-selector" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <div className="selector-button">
          <span className="search-icon">🔍</span>
          <span className="placeholder">Select a community</span>
          <span className="dropdown-arrow">▼</span>
        </div>
        {isDropdownOpen && (
          <div className="community-dropdown">
            <div className="community-item">
              <img src="/default-avatar.png" alt="" className="community-icon" />
              <div className="community-info">
                <div className="community-name">Your profile</div>
                <div className="community-meta">u/YourUsername</div>
              </div>
            </div>
            {/* Vous pouvez ajouter plus de communautés ici */}
          </div>
        )}
      </div>
      <div className="form-tabs">
        <button 
          className={`form-tab ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}>Text</button>
        <button 
          className={`form-tab ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}>Images & Video</button>
        <button 
          className={`form-tab ${activeTab === 'link' ? 'active' : ''}`}
          onClick={() => setActiveTab('link')}>Link</button>
        <button 
          className={`form-tab ${activeTab === 'poll' ? 'active' : ''}`}
          onClick={() => setActiveTab('poll')}>Poll</button>
      </div>

      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="character-count">0/300</div>

        {activeTab === 'text' && (
          <>
            <div className="formatting-toolbar">
              <button type="button" className="formatting-button">B</button>
              <button type="button" className="formatting-button">i</button>
              <button type="button" className="formatting-button">S</button>
              <button type="button" className="formatting-button">X²</button>
              <button type="button" className="formatting-button">T</button>
              <button type="button" className="formatting-button">∞</button>
              <button type="button" className="formatting-button">≡</button>
              <button type="button" className="formatting-button">""</button>
              <button type="button" className="formatting-button">&lt;/&gt;</button>
              <button type="button" className="formatting-button">↺</button>
              <button type="button" className="formatting-button">⊞</button>
            </div>
            <textarea placeholder="Body text (optional)" value={content} onChange={(e) => setContent(e.target.value)} />
          </>
        )}

        <div className="button-group">
          <button type="button" className="save-draft-button">Save Draft</button>
          <button type="submit" className="post-button">Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;