import React from 'react';
import './PostPreview.css';

interface PostPreviewProps {
  title: string;
  imageUrl: string;
  subreddit: string;
  timeAgo: string;
  author: string;
  upvotes: number;
  comments: number;
}

const PostPreview: React.FC<PostPreviewProps> = ({
  imageUrl,
  upvotes,
  comments,
}) => {
  return (
    <>
      <div className="post-card">
        <div className="post-header">
          <span className="subreddit">r/MySkin</span>
          <span className="details">• Il y a 34 min</span>
        </div>
        <img src={imageUrl} alt="La skin care coreenne...j’ai vraiment besoin de parler les filles? foncez  vous me remercirez plus tard" className="post-image" />
        <div className="post-footer">
          <span>⬆️ {upvotes}</span>
          <span>💬 {comments} comments</span>
          <span>🔗 Share</span>
        </div>
      </div>
      <div className="post-card">
        <div className="post-header">
          <span className="subreddit">r/Notfunny</span>
          <span className="details">• Il y a 12 min</span>
        </div>
        <img src="https://example.com/image1.jpg" alt="And that’s perfect mate, cheers" className="post-image" />
        <div className="post-footer">
          <span>⬆️ 120</span>
          <span>💬 45 comments</span>
          <span>🔗 Share</span>
        </div>
      </div>
      
      <div className="post-card">
        <div className="post-header">
          <span className="subreddit">u/Scaventa</span>
          <span className="details">• Il y a 1h</span>
        </div>
        <img src="https://example.com/image2.jpg" alt="My local chili’s doesn’t play around " className="post-image" />
        <div className="post-footer">
          <span>⬆️ 98</span>
          <span>💬 30 comments</span>
          <span>🔗 Share</span>
        </div>
      </div>
      
      <div className="post-card">
        <div className="post-header">
          <span className="subreddit">u/Stitches</span>
          <span className="details">• Il y a 1h</span>
        </div>
        <img src="https://example.com/image3.jpg" alt="Forgot to bring toothpaste on trop to Japan. Concierge gave me this!" className="post-image" />
        <div className="post-footer">
          <span>⬆️ 76</span>
          <span>💬 22 comments</span>
          <span>🔗 Share</span>
        </div>
      </div>
      
      <div className="post-card">
        <div className="post-header">
          <span className="subreddit">r/MySkin</span>
          <span className="details">• Il y a 3 jours</span>
        </div>
        <img src="https://example.com/image4.jpg" alt="Forgot to bring toothpaste on trop to Japan. Concierge gave me this!" className="post-image" />
        <div className="post-footer">
          <span>⬆️ 43</span>
          <span>💬 10 comments</span>
          <span>🔗 Share</span>
        </div>
      </div>
    </>
  );
};

export default PostPreview;
