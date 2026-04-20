import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [prenom, setPrenom] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, motDePasse, prenom);
      navigate('/login');
    } catch {
      setErreur('Email déjà utilisé');
    }
  };

  return (
    <div className="page" style={{ maxWidth: 400, margin: '80px auto' }}>
      <div className="app-logo" style={{ marginBottom: 32 }}>FIT<span>TRACK</span></div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 12 }}
        />
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
          Créer mon compte
        </button>
      </form>
        <button className="btn-add" style={{ width: '100%', marginTop: 5}} onClick={() => navigate('/login')}>
            Se connecter
        </button>
    </div>
  );
}