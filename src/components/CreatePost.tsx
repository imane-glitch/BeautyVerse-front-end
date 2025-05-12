import React, { useState } from 'react';
import './CreatePost.css';

const CreatePost: React.FC = () => {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <div className="create-post-container">
      <h1 className="create-post-title">Create post</h1>

      <div className="community-select">
        <span className="community-select-icon">🔍</span>
        <span>Select a community</span>
      </div>

      <div className="post-type-tabs">
        <button 
          className={post-type-tab ${activeTab === 'text' ? 'active' : ''}}
          onClick={() => setActiveTab('text')}
        >
          Text
        </button>
        <button 
          className={post-type-tab ${activeTab === 'images' ? 'active' : ''}}
          onClick={() => setActiveTab('images')}
        >
          Images & Video
        </button>
        <button 
          className={post-type-tab ${activeTab === 'link' ? 'active' : ''}}
          onClick={() => setActiveTab('link')}
        >
          Link
        </button>
        <button 
          className={post-type-tab ${activeTab === 'poll' ? 'active' : ''}}
          onClick={() => setActiveTab('poll')}
        >
          Poll
        </button>
      </div>
    </div>
  );
};

export default CreatePost;