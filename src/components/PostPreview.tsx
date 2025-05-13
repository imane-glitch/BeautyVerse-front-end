import React from 'react';
import './PostPreview.css';

interface Block {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

interface PostPreviewProps {
  title: string;
  imageUrl?: string;
  subreddit: string;
  author: string;
  timeAgo: string;
  upvotes: number;
  comments: number;
  content?: Block[] | string;
  link?: string;
}

const PostPreview: React.FC<PostPreviewProps> = ({
  title,
  imageUrl,
  subreddit,
  author,
  timeAgo,
  upvotes,
  comments,
  content,
  link
}) => {
  const renderContent = (content: Block[] | string | undefined) => {
    if (!content) return null;

    if (typeof content === 'string') {
      return (
        <div className="post-content">
          <p>{content}</p>
        </div>
      );
    }

    return (
      <div className="post-content">
        {content.map((block, index) => {
          if (block.type === 'paragraph') {
            return (
              <p key={index}>
                {block.children.map(child => child.text).join('')}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-subreddit">{subreddit}</span>
        <span className="post-metadata">
          Posted by {author} {timeAgo}
        </span>
      </div>

      <h3 className="post-title">{title}</h3>
      
      {renderContent(content)}
      
      {imageUrl && (
        <div className="post-image-container">
          <img src={imageUrl} alt={title} className="post-image" />
        </div>
      )}
      
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="post-link">
          {link}
        </a>
      )}

      <div className="post-footer">
        <div className="post-votes">
          <span>↑</span>
          <span>{upvotes}</span>
          <span>↓</span>
        </div>
        <div className="post-comments">
          <span>💬 {comments} comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostPreview; 
