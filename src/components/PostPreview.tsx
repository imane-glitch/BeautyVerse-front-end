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
        <img src="https://media.discordapp.net/attachments/1311613492150927360/1371620270254723223/clean_girl_bv.jpg?ex=6823cc6b&is=68227aeb&hm=3ee00eee44c1255aca3d7e5030778b083eb630123ea94794f6c9c2d38de1c3ff&=&format=webp&width=1270&height=1588" alt="La skin care coreenne...j’ai vraiment besoin de parler les filles? foncez  vous me remercirez plus tard" className="post-image" />
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
        <img src="https://media.discordapp.net/attachments/1308786211581722624/1371620854529790143/ah-thats-perfect-mate-cheers-v0-bdj9stkfgqye1.jpeg.webp?ex=6823ccf7&is=68227b77&hm=7934270c3de68c3e803a16ca426367c31a64f2a71475cb64e35228ce4a9ec8ac&=&format=webp&width=640&height=718" alt="And that’s perfect mate, cheers" className="post-image" />
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
        <img src="" alt="My local chili’s doesn’t play around " className="post-image" />
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
