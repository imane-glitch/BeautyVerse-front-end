import React from 'react';
import './PostPreview.css';

interface Post {
  id: number;
  title: string;
  content?: string;
  link?: string;
  image?: string[];
  createdAt: string;
  subreddit?: {
    id: number;
    name: string;
  };
}

interface PostPreviewProps {
  posts: Post[];
}

const PostPreview: React.FC<PostPreviewProps> = ({ posts }) => {
    console.log(posts)
  if (!posts || posts.length === 0) {
    return <p>Aucun post créé pour le moment.</p>;
  }

  return (
    <div className="post-preview-container">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3 className="post-title">{post.title}</h3>
          {post.subreddit && <p className="post-subreddit">r/{post.subreddit.name}</p>}
          {/* {post.subreddit && <p className="post-subreddit">r/{post.subreddit.name}</p>}
          {post.content && <p className="post-content">{post.content}</p>}
          {post.link && (
            <p className="post-link">
              <a href={post.link} target="_blank" rel="noopener noreferrer">{post.link}</a>
            </p>
          )}
          {post.image && post.image.length > 0 && (
            <div className="post-images">
              {post.image?.map((imgId, index) => (
                <img
                  key={index}
                  src={`http://localhost:1337/uploads/${imgId}`}
                  alt={`Post image ${index + 1}`}
                  className="post-image"
                />
              ))}
            </div>
          )}
          <p className="post-date">Publié le: {new Date(post.createdAt).toLocaleString()}</p> */}
        </div>
      ))}
    </div>
  );
};

export default PostPreview;
