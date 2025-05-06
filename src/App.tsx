import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)

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
        <input type="email" placeholder="Adresse email *" />
        <input type="password" placeholder="Mot de passe *" />
        <button>Se connecter</button>
        <p>Mot de passe oublié ?</p>
        <p>Pas encore de compte ? <a href="#">S'inscrire</a></p>
        <p>En vous inscrivant, vous acceptez nos <a href="https://redditinc.com/policies/user-agreement">Conditions d'utilisation</a> et notre <a href="https://www.reddit.com/policies/privacy-policy">Politique de confidentialité</a>.</p>
      </div>
    </div>
  )}
      {isOpen2 && (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={() => setIsOpen2(false)}>✖</button>
        <h2>S'inscrire</h2>
        <input type="email" placeholder="Adresse email *" />
        <button>Continuer</button>
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
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
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
  )
}

export default App
