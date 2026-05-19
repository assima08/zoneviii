# ZoneVIII

Plateforme web de studio audio développée avec React, TypeScript, Django REST Framework et PostgreSQL.

ZoneVIII permet :
- d’afficher les services du studio
- de consulter les tarifs
- de réserver une session
- de gérer les réservations depuis Django Admin

---

# Stack technique

## Frontend
- React
- TypeScript
- Vite
- CSS

## Backend
- Django
- Django REST Framework
- PostgreSQL

---

# Fonctionnalités actuelles

## Frontend
- Routing React Router
- Hero section moderne
- Navbar responsive
- Footer glassmorphism
- Liste des services dynamique
- Cartes de réservation
- Modal de réservation premium
- Communication API avec Django

## Backend
- API REST Django
- PostgreSQL
- Gestion des services
- Gestion des tarifs
- Gestion des clients
- Gestion des réservations
- Django Admin

---

# Structure du projet

```txt
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── interfaces/
│   ├── routes/
│   ├── styles/
│   └── assets/
│
backend/
│
├── home/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
