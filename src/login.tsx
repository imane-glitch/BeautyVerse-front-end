import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1337';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/local', {
        identifier,
        password,
      });

      const { jwt, user } = res.data;
      localStorage.setItem('token', jwt);
      alert(`Bienvenue ${user.username}`);
    } catch (err: unknown) {
      alert('Échec de la connexion');
      if (axios.isAxiosError(err)) {
        console.error(err.response);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" placeholder="Email ou Username" onChange={(e) => setIdentifier(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default Login;
