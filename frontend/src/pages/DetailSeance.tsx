import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExercices, ajouterExercice, supprimerExercice, modifierExercice } from '../api';
import type { ExerciceSeance } from '../types';

export default function DetailSeance() {
  const { id } = useParams<{ id: string }>();
  const seanceId = Number(id);
  const navigate = useNavigate();

  const [exercices, setExercices] = useState<ExerciceSeance[]>([]);
  const [nom, setNom] = useState('');
  const [series, setSeries] = useState(4);
  const [repetitions, setRepetitions] = useState(10);
  const [poids, setPoids] = useState(0);

const [exerciceEnEdition, setExerciceEnEdition] = useState<number | null>(null);
const [editSeries, setEditSeries] = useState(0);
const [editRepetitions, setEditRepetitions] = useState(0);
const [editPoids, setEditPoids] = useState(0);

  useEffect(() => {
    getExercices(seanceId)
      .then(data => Array.isArray(data) ? setExercices(data) : setExercices([]))
      .catch(() => setExercices([]));
  }, [seanceId]);

  const handleAjouter = async (e: React.FormEvent) => {
    e.preventDefault();
    const nouvel = await ajouterExercice({ nom, series, repetitions, poids, seance: { id: seanceId } });
    setExercices(prev => [...prev, nouvel]);
    setNom('');
    setPoids(0);
  };

  const handleModifier = async (exId: number) => {
    const modif = await modifierExercice(exId, { 
        nom: exercices.find(e => e.id === exId)!.nom,
        series: editSeries, 
        repetitions: editRepetitions, 
        poids: editPoids, 
        seance: { id: seanceId } 
    });
    setExercices(prev => prev.map(ex => ex.id === exId ? modif : ex));
    setExerciceEnEdition(null);
};

  const handleSupprimer = async (exId: number) => {
    await supprimerExercice(exId);
    setExercices(prev => prev.filter(e => e.id !== exId));
  };

  const totalVolume = exercices.reduce((acc, ex) => acc + ex.series * ex.repetitions * ex.poids, 0);

  return (
    <div className="page">
      <header className="app-header">
        <div className="app-logo">FIT<span>TRACK</span></div>
        <div className="header-tag">séance #{seanceId}</div>
      </header>

      <button className="btn-back" onClick={() => navigate('/')}>
        ← retour
      </button>

      <div className="section-title">
        Exercices
        <span className="section-count">{exercices.length} exercice{exercices.length > 1 ? 's' : ''}</span>
      </div>

      {totalVolume > 0 && (
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--accent)', marginBottom: 24, letterSpacing: 1 }}>
          VOLUME TOTAL: {totalVolume.toLocaleString('fr-FR')} kg
        </div>
      )}

      <div className="exercise-form">
        <div className="exercise-form-labels">
          <span className="form-label">Exercice</span>
          <span className="form-label">Séries</span>
          <span className="form-label">Reps</span>
          <span className="form-label">Poids (kg)</span>
        </div>
        <form onSubmit={handleAjouter}>
          <div className="exercise-form-row">
            <input
              value={nom}
              onChange={e => setNom(e.target.value)}
              placeholder="ex: Squat"
              required
            />
            <input
              type="number"
              value={series}
              onChange={e => setSeries(Number(e.target.value))}
              min={1}
            />
            <input
              type="number"
              value={repetitions}
              onChange={e => setRepetitions(Number(e.target.value))}
              min={1}
            />
            <input
              type="number"
              value={poids}
              onChange={e => setPoids(Number(e.target.value))}
              min={0}
              step={0.5}
            />
          </div>
          <button type="submit" className="btn-add" style={{ width: '100%', fontSize: 16, padding: '10px' }}>
            + Enregistrer l'exercice
          </button>
        </form>
      </div>

      {exercices.length === 0
        ? <div className="empty">// Aucun exercice. Ajoute ton premier mouvement.</div>
        : (
          <ul className="exercise-list" style={{ listStyle: 'none', padding: 0 }}>
            {exercices.map(ex => (
              <li key={ex.id}>
                <div className="exercise-card">
                  <div>
                    <div className="exercise-name">{ex.nom}</div>
                    <div className="exercise-stats">
                      <div className="stat">
                        {exerciceEnEdition === ex.id
                          ? <input type="number" value={editSeries} onChange={e => setEditSeries(Number(e.target.value))} min={1} style={{width: 50}} />
                          : <span className="stat-value">{ex.series}</span>
                        }
                        <span className="stat-label">séries</span>
                      </div>
                      <div className="stat">
                        {exerciceEnEdition === ex.id
                          ? <input type="number" value={editRepetitions} onChange={e => setEditRepetitions(Number(e.target.value))} min={1} style={{width: 50}} />
                          : <span className="stat-value">{ex.repetitions}</span>
                        }
                        <span className="stat-label">reps</span>
                      </div>
                      <div className="stat">
                        {exerciceEnEdition === ex.id
                          ? <input type="number" value={editPoids} onChange={e => setEditPoids(Number(e.target.value))} min={0} step={0.5} style={{width: 50}} />
                          : <span className="stat-value">{ex.poids}</span>
                        }
                        <span className="stat-label">kg</span>
                      </div>
                    </div>
                  </div>
                  {exerciceEnEdition === ex.id ? (
                    <>
                      <button className="btn-add" onClick={() => handleModifier(ex.id)}>✓</button>
                      <button className="btn-delete" onClick={() => setExerciceEnEdition(null)}>✗</button>
                    </>
                  ) : (
                    <>
                      <button className="btn-add" onClick={() => {
                        setExerciceEnEdition(ex.id);
                        setEditSeries(ex.series);
                        setEditRepetitions(ex.repetitions);
                        setEditPoids(ex.poids);
                      }}>edit</button>
                      <button className="btn-delete" onClick={() => handleSupprimer(ex.id)}>suppr.</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
}
