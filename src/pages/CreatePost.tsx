import React, { useEffect, useRef, useState, DragEvent } from 'react';
import axios from 'axios';
import '../components/PostForm.css';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:1337';

interface Subreddit {
  id: number;
  name: string;
}

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'images' | 'link'>('text');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSubreddit, setSelectedSubreddit] = useState<Subreddit | null>(null);
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les subreddits existants
    const fetchSubreddits = async () => {
      try {
        const response = await axios.get('/api/subreddits');
        setSubreddits(response.data.data.map((item: any) => ({
          id: item.id,
          name: item.attributes.name,
        })));
      } catch (err) {
        console.error('Erreur lors du chargement des subreddits', err);
      }
    };
    fetchSubreddits();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const postData: any = {
      title,
      content,
      slug,
      ...(selectedSubreddit && { subreddit: selectedSubreddit.id }),
    };

    if (activeTab === 'link') postData.link = linkUrl;

    const formData = new FormData();


    try {
      if (selectedFiles.length) {
        selectedFiles.forEach((file) => {
          formData.append('files', file);
        });


        const res = await axios.post('/api/upload', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const imageIds = [];

        for (const image of res.data) {
          imageIds.push(image.id);
        }

        postData.image = imageIds;
      }


      await axios.post('/api/posts', { data: postData }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Post créé !');
      navigate('/');
    } catch (err) {
      alert('Erreur lors de la création du post');
      console.error(err);
    }
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
      setSelectedFiles(prev => [...prev, ...mediaFiles]);
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
    setSelectedFiles(prev => [...prev, ...mediaFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="form-container">
      <div className="community-selector" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <div className="selector-button">
          <span className="search-icon">🔍</span>
          <span className="placeholder">
            {selectedSubreddit ? selectedSubreddit.name : "Sélectionner une communauté"}
          </span>
          <span className="dropdown-arrow">▼</span>
        </div>
        {isDropdownOpen && (
          <div className="community-dropdown">
            {subreddits.map((sub) => (
              <div
                key={sub.id}
                className="community-item"
                onClick={() => {
                  setSelectedSubreddit(sub);
                  setIsDropdownOpen(false);
                }}
              >
                <img src="/default-avatar.png" alt="" className="community-icon" />
                <div className="community-info">
                  <div className="community-name">{sub.name}</div>
                  <div className="community-meta">r/{sub.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-tabs">
        <button className={`form-tab ${activeTab === 'text' ? 'active' : ''}`} onClick={() => setActiveTab('text')}>Texte</button>
        <button className={`form-tab ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>Images & Vidéos</button>
        <button className={`form-tab ${activeTab === 'link' ? 'active' : ''}`} onClick={() => setActiveTab('link')}>Lien</button>
      </div>

      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <div className="character-count">{title.length}/300</div>

        {activeTab === 'text' && (
          <>
            <div className="formatting-toolbar">
              <button type="button" className="formatting-button">B</button>
              <button type="button" className="formatting-button">i</button>
              {/* Ajoute d'autres boutons si nécessaire */}
            </div>
            <textarea placeholder="Contenu (facultatif)" value={content} onChange={(e) => setContent(e.target.value)} />
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
              <p>Glissez et déposez des fichiers ici</p>
              <p>ou</p>
              <button type="button" className="upload-button">Télécharger</button>
            </div>
            {selectedFiles.length > 0 && (
              <div className="selected-files">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="file-preview">
                    {file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(file)} alt="preview" />
                    ) : (
                      <video src={URL.createObjectURL(file)} controls />
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
              placeholder="Lien URL*"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="link-input"
              required
            />
          </div>
        )}

        <div className="button-group">
          <button type="button" className="save-draft-button">Brouillon</button>
          <button type="submit" className="post-button">Poster</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
