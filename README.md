# ZoneVIII

Plateforme web de studio audio construite avec React, TypeScript, Django REST Framework et PostgreSQL.

## Fonctionnalites

- Affichage des services et tarifs depuis l'API Django
- Systeme de reservation maison conserve
- Validation anti-conflit des creneaux cote backend
- Etats de chargement et d'erreur cote frontend
- Configuration par variables d'environnement
- Structure prete pour Vercel et Railway

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Variable a configurer sur Vercel:

```env
VITE_API_BASE_URL=https://your-railway-app.up.railway.app
```

## Backend

```bash
cd backend
python -m venv .venv
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Variables a configurer sur Railway:

```env
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=your-railway-app.up.railway.app
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
CSRF_TRUSTED_ORIGINS=https://your-vercel-app.vercel.app
DATABASE_URL=postgresql://user:password@host:5432/database
```

## Endpoints principaux

- `GET /services/`
- `GET /tarifs/`
- `GET /reservations/`
- `POST /reservations/create/`
- `GET /experts/`
- `GET /formations/`
