import React, { useState, useRef, DragEvent } from 'react';
import axios from 'axios';
import '../components/PostForm.css';

axios.defaults.baseURL = 'http://localhost:1337';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('text');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    const postData = {
      title,
      content,
      ...(activeTab === 'link' && { link: linkUrl }),
    };

    formData.append('data', JSON.stringify(postData));
    
    if (activeTab === 'images') {
      selectedFiles.forEach((file) => {
        formData.append('files.media', file);
      });
    }

    try {
      await axios.post('/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post créé !');
    } catch (err) {
      alert('Erreur lors de la création du post');
      console.error(err);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const mediaFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    setSelectedFiles(prevFiles => [...prevFiles, ...mediaFiles]);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const mediaFiles = files.filter(file => 
        file.type.startsWith('image/') || file.type.startsWith('video/')
      );
      setSelectedFiles(prevFiles => [...prevFiles, ...mediaFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
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

        {activeTab === 'images' && (
          <div 
            className={`upload-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleFileSelect}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept="image/*,video/*"
              multiple
              style={{ display: 'none' }}
            />
            <div className="upload-message">
              <p>Drag and drop images or videos here</p>
              <p>or</p>
              <button type="button" className="upload-button">Upload</button>
            </div>
            {selectedFiles.length > 0 && (
              <div className="selected-files">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="file-preview">
                    {file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(file)} alt="preview" />
                    ) : (
                      <video src={URL.createObjectURL(file)} />
                    )}
                    <button 
                      type="button" 
                      className="remove-file" 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'link' && (
          <div className="link-input-container">
            <input
              type="url"
              placeholder="Link URL*"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="link-input"
              required
            />
          </div>
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
