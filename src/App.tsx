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

function App(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerUsername, setRegisterUsername] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
      });
      const { jwt, user } = response.data;
      localStorage.setItem('token', jwt);
      alert(`Bienvenue ${user.username}`);
      setIsOpen(false);
      window.location.reload();
    } catch (error: unknown) {
      alert('Erreur de connexion');
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  };

  const handleRegister = async (): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      });
      const { jwt, user } = response.data;
      localStorage.setItem('token', jwt);
      alert(`Compte créé pour ${user.username}`);
      setIsOpen2(false);
      setIsOpen(true);
    } catch (error: unknown) {
      alert('Erreur d\'inscription');
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar 
          onLoginClick={() => setIsOpen(true)} 
          onRegisterClick={() => setIsOpen2(true)} 
        />
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

        {/* Modal de connexion */}
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setIsOpen(false)}>✖</button>
              <h2>Connexion</h2>
              <input 
                type="email" 
                placeholder="Adresse email *" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Mot de passe *" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button onClick={handleLogin}>Se connecter</button>
              <p>Mot de passe oublié ?</p>
              <p>
                Pas encore de compte ?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setIsOpen2(true);
                  }}
                >
                  S'inscrire
                </a>
              </p>
              <p>
                En vous inscrivant, vous acceptez nos{' '}
                <a href="https://redditinc.com/policies/user-agreement" target="_blank" rel="noreferrer">
                  Conditions d'utilisation
                </a>{' '}
                et notre{' '}
                <a href="https://www.reddit.com/policies/privacy-policy" target="_blank" rel="noreferrer">
                  Politique de confidentialité
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Modal d'inscription */}
        {isOpen2 && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setIsOpen2(false)}>✖</button>
              <h2>S'inscrire</h2>
              <input 
                type="text" 
                placeholder="Nom d'utilisateur *" 
                value={registerUsername} 
                onChange={(e) => setRegisterUsername(e.target.value)} 
              />
              <input 
                type="email" 
                placeholder="Adresse email *" 
                value={registerEmail} 
                onChange={(e) => setRegisterEmail(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Mot de passe *" 
                value={registerPassword} 
                onChange={(e) => setRegisterPassword(e.target.value)} 
              />
              <button onClick={handleRegister}>Continuer</button>
              <p>
                En vous inscrivant, vous acceptez nos{' '}
                <a href="https://redditinc.com/policies/user-agreement" target="_blank" rel="noreferrer">
                  Conditions d'utilisation
                </a>{' '}
                et notre{' '}
                <a href="https://www.reddit.com/policies/privacy-policy" target="_blank" rel="noreferrer">
                  Politique de confidentialité
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
