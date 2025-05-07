import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1337';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/auth/local/register', {
      username,
      email,
      password,
    });

    const { jwt, user } = res.data;
    localStorage.setItem('token', jwt);
    alert(`Compte créé pour ${user.username}`);
  } catch (err: unknown) {
    alert("Erreur d'inscription");
    if (axios.isAxiosError(err)) {
      console.error(err.response);
    } else {
      console.error(err);
    }
  }
};

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;
