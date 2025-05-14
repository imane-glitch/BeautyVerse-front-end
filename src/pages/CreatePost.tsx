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
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les subreddits existants
    const fetchSubreddits = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Veuillez vous connecter pour créer un post');
          return;
        }

        const response = await axios.get('/api/subreddits', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.data && response.data.data) {
          setSubreddits(response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name.replace('r/', ''), // Enlever le préfixe r/ s'il existe
          })));
        }
      } catch (err: any) {
        console.error('Erreur lors du chargement des subreddits', err);
        if (err.response?.status === 403) {
          setError('Accès refusé. Veuillez vous reconnecter.');
        } else {
          setError('Impossible de charger les communautés');
        }
      }
    };
    fetchSubreddits();

    // Fermer le dropdown quand on clique en dehors
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedSubreddit) {
      setError('Veuillez sélectionner une communauté');
      return;
    }

    if (!title.trim()) {
      setError('Le titre est requis');
      return;
    }

    const token = localStorage.getItem('token');

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const postData: any = {
      title,
      content: content ? [
        {
          type: "paragraph",
          children: [
            {
              text: content,
              type: "text"
            }
          ]
        }
      ] : null,
      slug,
      subreddit: selectedSubreddit.id,
    };

    if (activeTab === 'link') {
      if (!linkUrl.trim()) {
        setError('Le lien est requis');
        return;
      }
      postData.link = linkUrl;
    }

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
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la création du post');
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
      {error && <div className="error-message">{error}</div>}
      
      <div className="community-selector" ref={dropdownRef}>
        <div 
          className={`selector-button ${!selectedSubreddit ? 'required' : ''}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedSubreddit ? (
            <>
              <span className="selected-community">r/{selectedSubreddit.name}</span>
            </>
          ) : (
            <>
              <span className="search-icon">🔍</span>
              <span className="placeholder">Sélectionner une communauté *</span>
            </>
          )}
          <span className="dropdown-arrow">▼</span>
        </div>
        
        {isDropdownOpen && (
          <div className="community-dropdown">
            {subreddits.length === 0 ? (
              <div className="no-communities">
                Aucune communauté disponible
              </div>
            ) : (
              subreddits.map((sub) => (
                <div
                  key={sub.id}
                  className={`community-item ${selectedSubreddit?.id === sub.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedSubreddit(sub);
                    setIsDropdownOpen(false);
                  }}
                >
                  <div className="community-info">
                    <div className="community-name">r/{sub.name}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleCreate} className="post-form">
        <input
          type="text"
          placeholder="Titre *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="post-title-input"
        />

        <div className="post-type-tabs">
          <button
            type="button"
            className={`tab ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            Texte
          </button>
          <button
            type="button"
            className={`tab ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            Images & Vidéos
          </button>
          <button
            type="button"
            className={`tab ${activeTab === 'link' ? 'active' : ''}`}
            onClick={() => setActiveTab('link')}
          >
            Lien
          </button>
        </div>

        {activeTab === 'text' && (
          <textarea
            placeholder="Texte (optionnel)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="post-content-input"
          />
        )}

        {activeTab === 'images' && (
          <div
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
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
            <div className="drop-zone-text">
              <span>📎 Glissez-déposez vos fichiers ici ou cliquez pour sélectionner</span>
            </div>
            {selectedFiles.length > 0 && (
              <div className="selected-files">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="file-preview">
                    <span>{file.name}</span>
                    <button type="button" onClick={() => removeFile(index)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'link' && (
          <input
            type="url"
            placeholder="URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="post-link-input"
          />
        )}

        <button type="submit" className="submit-button">
          Publier
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
