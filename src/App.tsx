import axios from 'axios';
import { JSX, useState } from 'react';
import './App.css';

import CreatePost from './components/CreatePost.tsx';
import EditPost from './components/EditPost.tsx';
import DeletePostButton from './components/DeletePostButton.tsx';
import './components/PostForm.css';
import PostPreview from './components/PostPreview.tsx';
import './components/PostPreview.css';
import Navbar from './components/Navbar.tsx';
import './components/Navbar.css';
import Sidebar from './components/Sidebar.tsx';
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
    <>
    <Navbar 
  onLoginClick={() => setIsOpen(true)} 
  onRegisterClick={() => setIsOpen2(true)} 
/>
      <Sidebar />

      <div className="layout">  
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setIsOpen(false)}>✖</button>
              <h2>Connexion</h2>
              <input type="email" placeholder="Adresse email *"value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Mot de passe *" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                <a href="https://redditinc.com/policies/user-agreement" target="_blank" rel="noreferrer">Conditions d'utilisation</a>{' '}
                et notre{' '}
                <a href="https://www.reddit.com/policies/privacy-policy" target="_blank" rel="noreferrer">Politique de confidentialité</a>
              </p>
            </div>
          </div>
        )}
        {isOpen2 && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setIsOpen2(false)}>✖</button>
              <h2>S'inscrire</h2>
              <input type="text" placeholder="Nom d'utilisateur *" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
              <input type="email" placeholder="Adresse email *" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
              <input type="password" placeholder="Mot de passe *" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
              <button onClick={handleRegister}>Continuer</button>
              <p>
                En vous inscrivant, vous acceptez nos{' '}
                <a href="https://redditinc.com/policies/user-agreement" target="_blank" rel="noreferrer">Conditions d'utilisation</a>{' '}
                et notre{' '}
                <a href="https://www.reddit.com/policies/privacy-policy" target="_blank" rel="noreferrer">Politique de confidentialité</a>
              </p>
            </div>
          </div>
        )}

          <main className="main-content">
            <h2>Gérer les posts</h2>

  {/* 1. Créer un post */}
  <CreatePost />

  {/* 2. Modifier le post avec ID 1 */}
  <EditPost postId={1} />

  {/* 3. Supprimer le post avec ID 1 */}
  <DeletePostButton postId={1} />

  <PostPreview
  title="The Abyss - Behind The Scenes 1989"
  imageUrl="/your/image/path.jpg"
  subreddit="r/Moviesinthemaking"
  author="u/mec"
  timeAgo="22h"
  upvotes={171}
  comments={7}
/>


          </main>
        </div>
    </>
  );
}

export default App;
