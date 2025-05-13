import React from 'react';
import './CreatePost.css';

interface CreatePostProps {
  subreddits: { id: number, name: string, description: string }[];
  selectedSubredditId: number | null;
  setSelectedSubredditId: (id: number) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({
  subreddits,
  selectedSubredditId,
  setSelectedSubredditId,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="create-post-container">
      {/* Sélectionner une communauté (Subreddit) */}
      <div className="community-select">
        <span className="community-select-icon">🔍</span>
        <span>Select a community</span>
      </div>

      <div className="community-dropdown">
        {subreddits.map((subreddit) => (
          <div
            key={subreddit.id}
            className={`community-item ${subreddit.id === selectedSubredditId ? 'selected' : ''}`}
            onClick={() => setSelectedSubredditId(subreddit.id)}
          >
            <img src="/default-avatar.png" alt="Community Icon" className="community-icon" />
            <div className="community-info">
              <div className="community-name">{subreddit.name}</div>
              <div className="community-meta">{subreddit.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Onglets de type de post */}
      <div className="post-type-tabs">
        <button 
          className={`post-type-tab ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Text
        </button>
        <button 
          className={`post-type-tab ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          Images & Video
        </button>
        <button 
          className={`post-type-tab ${activeTab === 'link' ? 'active' : ''}`}
          onClick={() => setActiveTab('link')}
        >
          Link
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
