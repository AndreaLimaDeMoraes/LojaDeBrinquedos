import React, { useState } from 'react';
import api from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, senha });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Erro no login, macho!");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login Vitrine</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="User" onChange={e => setUsername(e.target.value)} /><br/>
        <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} /><br/>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;