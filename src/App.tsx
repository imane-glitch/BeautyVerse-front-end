import axios from 'axios';
import { JSX, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import CreatePostPage from './pages/CreatePost';
import PostPreview from './components/PostPreview';
import './components/PostPreview.css';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import Sidebar from './components/Sidebar';
import './components/Sidebar.css';
import RightSidebar from './components/RightSidebar';
import './components/RightSidebar.css';
import SearchResults from './pages/SearchResults';

interface SignupModalProps {
  registerUsername: string;
  registerEmail: string;
  registerPassword: string;
  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  registerUsername,
  registerEmail,
  registerPassword,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onRegister,
  onSwitchToLogin
}) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>S'inscrire</h2>
      <input type="text" placeholder="Nom d'utilisateur" value={registerUsername} onChange={(e) => onUsernameChange(e.target.value)} />
      <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => onEmailChange(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={registerPassword} onChange={(e) => onPasswordChange(e.target.value)} />
      <button onClick={onRegister}>S'inscrire</button>
      <p>
        Déjà un compte ? <span className="switch-link" onClick={onSwitchToLogin}>Se connecter</span>
      </p>
    </div>
  </div>
);

interface LoginModalProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onSwitchToSignup
}) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Se connecter</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => onEmailChange(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => onPasswordChange(e.target.value)} />
      <button onClick={onLogin}>Se connecter</button>
      <p>
        Pas encore de compte ? <span className="switch-link" onClick={onSwitchToSignup}>S'inscrire</span>
      </p>
    </div>
  </div>
);

const STRAPI_URL = 'http://localhost:1337';

interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  url: string;
}

interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  content: string | null;
  createdAt: string;
  publishedAt: string;
  like_count: string;
  link: string | null;
  user: {
    id: number;
    username: string;
  } | null;
  subreddit: {
    id: number;
    name: string;
  } | null;
  image: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    url: string;
  }> | null;
}

interface Post {
  id: number;
  title: string;
  content: string | Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
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

const api = axios.create({
  baseURL: STRAPI_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App(): JSX.Element {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setShowLoginModal(true);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await api.get('/api/posts', {
        params: {
          'populate[0]': 'image',
          'populate[1]': 'user',
          'populate[2]': 'subreddit',
          'sort[0]': 'createdAt:desc'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const posts = response.data.results || [];

      const transformedPosts = posts.map((post: StrapiPost) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        link: post.link,
        createdAt: post.createdAt,
        publishedAt: post.publishedAt,
        like_count: parseInt(post.like_count) || 0,
        user: post.user ? {
          id: post.user.id,
          username: post.user.username
        } : null,
        subreddit: post.subreddit ? {
          id: post.subreddit.id,
          name: post.subreddit.name
        } : null,
        image: post.image ? post.image.map(img => ({
          id: img.id,
          documentId: img.documentId,
          name: img.name,
          alternativeText: img.alternativeText,
          caption: img.caption,
          url: img.url
        })) : null
      }));

      setPosts(transformedPosts);
    } catch (error) {
      console.error('Erreur lors du chargement des posts:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setShowLoginModal(true);
        }
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/local', {
        identifier: email,
        password: password,
      });
      const token = response.data.jwt;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
      await fetchPosts();
    } catch (error) {
      alert('Erreur de connexion. Vérifiez vos identifiants.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await api.post('/auth/local/register', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      });
      const token = response.data.jwt;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setShowSignupModal(false);
      setRegisterEmail('');
      setRegisterUsername('');
      setRegisterPassword('');
      await fetchPosts();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        alert(error.response.data.error.message);
      } else {
        alert("Erreur lors de l'inscription");
      }
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "moins d'une heure";
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}j`;
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route
                path="/"
                element={
                  <>
                    {posts.map((post) => (
                      <PostPreview
                        key={post.id}
                        post={post}
                        formatTimeAgo={formatTimeAgo}
                      />
                    ))}
                  </>
                }
              />
            </Routes>
          </main>
          <RightSidebar />
        </div>

        {showLoginModal && (
          <LoginModal
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onLogin={handleLogin}
            onSwitchToSignup={switchToSignup}
          />
        )}

        {showSignupModal && (
          <SignupModal
            registerUsername={registerUsername}
            registerEmail={registerEmail}
            registerPassword={registerPassword}
            onUsernameChange={setRegisterUsername}
            onEmailChange={setRegisterEmail}
            onPasswordChange={setRegisterPassword}
            onRegister={handleRegister}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
