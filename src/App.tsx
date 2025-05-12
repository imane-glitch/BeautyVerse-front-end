import axios from 'axios';
import { JSX, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import CreatePostPage from './pages/CreatePost';
import PostPreview from './components/PostPreview';
import './components/PostPreview.css';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import Sidebar from './components/Sidebar';
import './components/Sidebar.css';

// Composants modaux définis en dehors de App
interface SignupModalProps {
  registerUsername: string;
  registerEmail: string;
  registerPassword: string;
  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRegister: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  registerUsername,
  registerEmail,
  registerPassword,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onRegister
}) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>S'inscrire</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={registerUsername}
        onChange={(e) => onUsernameChange(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={registerEmail}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={registerPassword}
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      <button onClick={onRegister}>S'inscrire</button>
    </div>
  </div>
);

interface LoginModalProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin
}) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Se connecter</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      <button onClick={onLogin}>Se connecter</button>
    </div>
  </div>
);

function App(): JSX.Element {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
      });
      localStorage.setItem('token', response.data.jwt);
      alert('Connexion réussie !');
      setShowLoginModal(false);
    } catch (error) {
      alert('Erreur de connexion');
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      });
      localStorage.setItem('token', response.data.jwt);
      alert('Inscription réussie !');
      setShowSignupModal(false);
      setShowLoginModal(true);
    } catch (error) {
      alert('Erreur d\'inscription');
      console.error(error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="layout">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/" element={
                <div className="posts-container">
                  <PostPreview
                    title="The Abyss - Behind The Scenes 1989"
                    imageUrl="/your/image/path.jpg"
                    subreddit="r/Moviesinthemaking"
                    author="u/mec"
                    timeAgo="22h"
                    upvotes={171}
                    comments={7}
                  />
                </div>
              } />
            </Routes>
          </main>
        </div>

        {showSignupModal && (
          <SignupModal
            registerUsername={registerUsername}
            registerEmail={registerEmail}
            registerPassword={registerPassword}
            onUsernameChange={setRegisterUsername}
            onEmailChange={setRegisterEmail}
            onPasswordChange={setRegisterPassword}
            onRegister={handleRegister}
          />
        )}
        {showLoginModal && (
          <LoginModal
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onLogin={handleLogin}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
