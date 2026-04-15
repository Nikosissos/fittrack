export interface Utilisateur {
  id: number;
  prenom: string;
  email: string;
  motDePasse?: string;
}

export interface ExerciceSeance {
  id: number;
  nom: string;
  series: number;
  repetitions: number;
  poids: number;
  seance?: { id: number };
}

export interface Seance {
  id: number;
  nom: string;
  date: string;
  utilisateur: { id: number };
  exercices?: ExerciceSeance[];
}
