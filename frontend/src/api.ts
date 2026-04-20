import axios from 'axios';
import type { Seance, ExerciceSeance, Utilisateur } from './types';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const creerUtilisateur = (data: Omit<Utilisateur, 'id'>) =>
  api.post<Utilisateur>('/utilisateurs', data).then(r => r.data);

export const login = (email: string, motDePasse: string) =>
  api.post<{ token: string; email: string; prenom: string }>(
    '/auth/login', 
    { email, motDePasse }
  ).then(r => r.data);

export const getSeances = (utilisateurId: number) =>
  api.get<Seance[]>('/seances', { params: { utilisateurId } }).then(r => r.data);

export const creerSeance = (data: Omit<Seance, 'id'>) =>
  api.post<Seance>('/seances', data).then(r => r.data);

export const supprimerSeance = (id: number) =>
  api.delete(`/seances/${id}`);

export const getExercices = (seanceId: number) =>
  api.get<ExerciceSeance[]>('/exercices', { params: { seanceId } }).then(r => r.data);

export const ajouterExercice = (data: Omit<ExerciceSeance, 'id'>) =>
  api.post<ExerciceSeance>('/exercices', data).then(r => r.data);

export const modifierExercice = (id: number, data: Omit<ExerciceSeance, 'id'>) =>
  api.put<ExerciceSeance>(`/exercices/${id}`, data).then(r => r.data);

export const supprimerExercice = (id: number) =>
  api.delete(`/exercices/${id}`);
