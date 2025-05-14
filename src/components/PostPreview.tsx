import React, { useState } from 'react';
import './PostPreview.css';
import Comments from './Comments';

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
  link?: string;
  createdAt: string;
  publishedAt: string;
  like_count: number;
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

interface PostPreviewProps {
  post: Post;
  formatTimeAgo: (dateString: string) => string;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post, formatTimeAgo }) => {
  const [showComments, setShowComments] = useState(false);

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

  const STRAPI_URL = 'http://localhost:1337';
  const imageUrl = post.image && post.image.length > 0 ? `${STRAPI_URL}${post.image[0].url}` : undefined;

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-subreddit">
          {post.subreddit ? `r/${post.subreddit.name}` : ''}
        </span>
        <span className="post-metadata">
          Posted by {post.user ? `u/${post.user.username}` : 'u/anonymous'} {formatTimeAgo(post.publishedAt || post.createdAt)}
        </span>
      </div>

      <h3 className="post-title">{post.title}</h3>
      
      {renderContent(post.content)}
      
      {imageUrl && (
        <div className="post-image-container">
          <img src={imageUrl} alt={post.title} className="post-image" />
        </div>
      )}
      
      {post.link && (
        <a href={post.link} target="_blank" rel="noopener noreferrer" className="post-link">
          {post.link}
        </a>
      )}

      <div className="post-footer">
        <div className="post-votes">
          <span>↑</span>
          <span>{post.like_count || 0}</span>
          <span>↓</span>
        </div>
        <div className="post-comments" onClick={() => setShowComments(!showComments)}>
          <span>💬 Commentaires</span>
        </div>
      </div>

      {showComments && (
        <Comments postId={post.id} formatTimeAgo={formatTimeAgo} />
      )}
    </div>
  );
};

export default PostPreview; 
