import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSeances, creerSeance, supprimerSeance } from '../api';
import type { Seance } from '../types';


export default function Seances() {
  const UTILISATEUR_ID = Number(localStorage.getItem('userId'));
  const [seances, setSeances] = useState<Seance[]>([]);
  const [nom, setNom] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
      setLoading(true);
      getSeances(UTILISATEUR_ID)
        .then(data => {
          Array.isArray(data) ? setSeances(data) : setSeances([]);
          setLoading(false);
        })
        .catch(() => {
          setErreur('Impossible de charger les séances.');
          setLoading(false);
        });
  }, []);

  const handleCreer = async (e: React.FormEvent) => {
    e.preventDefault();
    const nouvelle = await creerSeance({ nom, date, utilisateur: { id: UTILISATEUR_ID } });
    setSeances(prev => [nouvelle, ...prev]);
    setNom('');
  };

  const handleSupprimer = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    await supprimerSeance(id);
    setSeances(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="page">
      <header className="app-header">
        <div>
          <div className="app-logo">FIT<span>TRACK</span></div>
        </div>
        <div className="header-tag">v0.1</div>
        <div className="deconnection-button" onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}>Déconnexion</div>
      </header>

      <form className="add-form" onSubmit={handleCreer}>
        <input
          value={nom}
          onChange={e => setNom(e.target.value)}
          placeholder="Nom de la séance (ex: Push lundi)"
          required
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <button type="submit" className="btn-add">+ Ajouter</button>
      </form>

      <div className="section-title">
        Séances
        <span className="section-count">{seances.length} enregistrée{seances.length > 1 ? 's' : ''}</span>
      </div>
      {loading && <div className="empty">// Chargement...</div>}
      {erreur && <div style={{ color: 'red' }}>{erreur}</div>}
      {seances.length === 0
        ? <div className="empty">// Aucune séance. Commence ton premier entraînement.</div>
        : (
          <ul className="session-list" style={{ listStyle: 'none', padding: 0 }}>
            {seances.map(s => (
              <li key={s.id}>
                <div className="session-card" onClick={() => navigate(`/seances/${s.id}`)}>
                  <div className="session-info">
                    <span className="session-name">{s.nom}</span>
                    <span className="session-date">{new Date(s.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="session-actions">
                    <button className="btn-delete" onClick={e => handleSupprimer(e, s.id)}>
                      suppr.
                    </button>
                    <span className="session-arrow">→</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
}
