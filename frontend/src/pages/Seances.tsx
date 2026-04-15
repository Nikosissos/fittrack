import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSeances, creerSeance, supprimerSeance } from '../api';
import type { Seance } from '../types';

const UTILISATEUR_ID = 1; // temporaire, sera remplacé par l'auth

export default function Seances() {
  const [seances, setSeances] = useState<Seance[]>([]);
  const [nom, setNom] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  useEffect(() => {
    getSeances(UTILISATEUR_ID)
      .then(data => Array.isArray(data) ? setSeances(data) : setSeances([]))
      .catch(() => setSeances([]));
  }, []);

  const handleCreer = async (e: React.FormEvent) => {
    e.preventDefault();
    const nouvelle = await creerSeance({ nom, date, utilisateur: { id: UTILISATEUR_ID } });
    setSeances(prev => [nouvelle, ...prev]);
    setNom('');
  };

  const handleSupprimer = async (id: number) => {
    await supprimerSeance(id);
    setSeances(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <h1>FitTrack</h1>
      <h2>Mes séances</h2>

      <form onSubmit={handleCreer} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={nom}
          onChange={e => setNom(e.target.value)}
          placeholder="Nom de la séance"
          required
          style={{ flex: 1, padding: '8px 12px', fontSize: 14 }}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          style={{ padding: '8px 12px', fontSize: 14 }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>
          Ajouter
        </button>
      </form>

      {seances.length === 0 && <p style={{ color: '#888' }}>Aucune séance pour l'instant.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {seances.map(s => (
          <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <span
              onClick={() => navigate(`/seances/${s.id}`)}
              style={{ cursor: 'pointer', fontWeight: 500, color: '#2563eb' }}
            >
              {s.nom} — {s.date}
            </span>
            <button
              onClick={() => handleSupprimer(s.id)}
              style={{ background: 'none', border: '1px solid #ddd', padding: '4px 10px', cursor: 'pointer', color: '#888' }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
