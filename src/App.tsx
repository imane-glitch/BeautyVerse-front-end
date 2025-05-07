import axios from 'axios';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
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
      const { jwt, user } = response.data;
      localStorage.setItem('token', jwt);
      alert(`Bienvenue ${user.username}`);
      setIsOpen(false);
    } catch (error: unknown) {
      alert('Erreur de connexion');
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword
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
    <>
      <div className="auth-buttons">
        <button onClick={() => setIsOpen(true)}>Se connecter</button>
        <button onClick={() => setIsOpen2(true)}>S'inscrire</button>
      </div>

      <div className="layout">
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
              <p>Pas encore de compte ? <a href="#" onClick={() => { setIsOpen(false); setIsOpen2(true); }}>S'inscrire</a></p>
              <p>En vous inscrivant, vous acceptez nos <a href="https://redditinc.com/policies/user-agreement">Conditions d'utilisation</a> et notre <a href="https://www.reddit.com/policies/privacy-policy">Politique de confidentialité</a>.</p>
            </div>
          </div>
        )}
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
              <p>En vous inscrivant, vous acceptez nos <a href="https://redditinc.com/policies/user-agreement">Conditions d'utilisation</a> et notre <a href="https://www.reddit.com/policies/privacy-policy">Politique de confidentialité</a>.</p>
            </div>
          </div>
        )}

        <div className="card">
          <aside className="sidebar">
            <h1>BeautyVerse</h1>
            <menu>Home</menu>
            <menu>Explore</menu>
            <menu>Notifications</menu>
            <menu>Messages</menu>
            <menu>Profile</menu>
            <menu>Blog</menu>
            <menu>More</menu>
            <button>Post</button>
          </aside>

          <main className="main-content">
            <div>
              <a href="https://vite.dev" target="_blank" rel="noreferrer">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank" rel="noreferrer">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
