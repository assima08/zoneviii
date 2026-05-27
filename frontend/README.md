# ZoneVIII Frontend

Interface React + TypeScript du studio creatif premium ZoneVIII.

## Production

Le frontend consomme l'API Django REST via la variable d'environnement suivante :

```env
VITE_API_URL=https://zoneviii-production.up.railway.app
```

## Commandes

```bash
npm install
npm run dev
npm run build
npm run lint
```

## SEO

Les fichiers publics `robots.txt`, `sitemap.xml`, `manifest.json`, `favicon.svg` et `og-image.png` sont prepares pour l'indexation Google, le partage social et le branding ZoneVIII.
