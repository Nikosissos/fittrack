import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, motDePasse);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', String(data.email));
      navigate('/');
    } catch {
      setErreur('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="page" style={{ maxWidth: 400, margin: '80px auto' }}>
      <div className="app-logo" style={{ marginBottom: 32 }}>FIT<span>TRACK</span></div>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12 }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={e => setMotDePasse(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12 }}
        />
        {erreur && <div style={{ color: 'red', marginBottom: 12 }}>{erreur}</div>}
        <button type="submit" className="btn-add" style={{ width: '100%' }}>
          Se connecter
        </button>
      </form>
    </div>
  );
}