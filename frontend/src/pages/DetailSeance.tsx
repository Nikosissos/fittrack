import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExercices, ajouterExercice, supprimerExercice } from '../api';
import type { ExerciceSeance } from '../types';

export default function DetailSeance() {
  const { id } = useParams<{ id: string }>();
  const seanceId = Number(id);
  const navigate = useNavigate();

  const [exercices, setExercices] = useState<ExerciceSeance[]>([]);
  const [nom, setNom] = useState('');
  const [series, setSeries] = useState(3);
  const [repetitions, setRepetitions] = useState(10);
  const [poids, setPoids] = useState(0);

  useEffect(() => {
    getExercices(seanceId).then(setExercices);
  }, [seanceId]);

  const handleAjouter = async (e: React.FormEvent) => {
    e.preventDefault();
    const nouvel = await ajouterExercice({ nom, series, repetitions, poids, seance: { id: seanceId } });
    setExercices(prev => [...prev, nouvel]);
    setNom('');
    setPoids(0);
  };

  const handleSupprimer = async (exId: number) => {
    await supprimerExercice(exId);
    setExercices(prev => prev.filter(e => e.id !== exId));
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', marginBottom: 16 }}>
        ← Retour
      </button>
      <h2>Exercices de la séance</h2>

      <form onSubmit={handleAjouter} style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
        <input
          value={nom}
          onChange={e => setNom(e.target.value)}
          placeholder="Exercice (ex: Squat)"
          required
          style={{ padding: '8px 12px', fontSize: 14 }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <input type="number" value={series} onChange={e => setSeries(Number(e.target.value))} min={1} placeholder="Séries" style={{ flex: 1, padding: '8px 12px', fontSize: 14 }} />
          <input type="number" value={repetitions} onChange={e => setRepetitions(Number(e.target.value))} min={1} placeholder="Répétitions" style={{ flex: 1, padding: '8px 12px', fontSize: 14 }} />
          <input type="number" value={poids} onChange={e => setPoids(Number(e.target.value))} min={0} step={0.5} placeholder="Poids (kg)" style={{ flex: 1, padding: '8px 12px', fontSize: 14 }} />
        </div>
        <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>
          Ajouter l'exercice
        </button>
      </form>

      {exercices.length === 0 && <p style={{ color: '#888' }}>Aucun exercice pour l'instant.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {exercices.map(ex => (
          <li key={ex.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <span>
              <strong>{ex.nom}</strong> — {ex.series}x{ex.repetitions} à {ex.poids} kg
            </span>
            <button
              onClick={() => handleSupprimer(ex.id)}
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
