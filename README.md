# FitTrack 

Application web de suivi d'entraînement musculaire — remplace le carnet papier par une interface simple et efficace pour enregistrer ses séances, ses exercices et suivre sa progression.

---

## Stack technique

**Backend**
- Java 21 + Spring Boot 4
- Spring Security + JWT (authentification)
- Spring Data JPA + Hibernate (ORM)
- PostgreSQL (base de données)
- Maven (build)

**Frontend**
- React 18 + TypeScript
- Vite (bundler)
- Axios (appels HTTP)
- React Router DOM (navigation)

**Infrastructure**
- Docker (PostgreSQL en conteneur)
- Git + GitHub

---

## Fonctionnalités

- Création de compte et connexion sécurisée (JWT + BCrypt)
- Gestion des séances d'entraînement (création, suppression)
- Ajout d'exercices par séance (nom, séries, répétitions, poids)
- Calcul automatique du volume total par séance
- Données personnalisées par utilisateur
- Interface dark industrial responsive

---

## Lancer le projet

### Prérequis

- Java 21
- Node.js 18+
- Docker Desktop
- Maven (inclus via `mvnw`)

### 1. Base de données

```bash
docker run --name fittrack-db \
  -e POSTGRES_PASSWORD=fittrack \
  -e POSTGRES_DB=fittrack \
  -p 5432:5432 -d postgres:16
```

### 2. Backend

```bash
./mvnw spring-boot:run
```

L'API démarre sur `http://localhost:8081`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application démarre sur `http://localhost:5173`

---

## Endpoints principaux

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Se connecter, obtenir un token JWT |
| GET | `/api/seances?utilisateurId=1` | Lister les séances |
| POST | `/api/seances` | Créer une séance |
| GET | `/api/seances/{id}/volume` | Volume total d'une séance |
| POST | `/api/exercices` | Ajouter un exercice |

> Toutes les routes sauf `/api/auth/**` nécessitent un header `Authorization: Bearer <token>`

---

## Auteur

**Nicolas Giethlen** — Développeur en reconversion vers Java Full-Stack  
GitHub : [github.com/Nikosissos](https://github.com/Nikosissos)
