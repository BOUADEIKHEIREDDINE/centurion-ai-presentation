# Présentation — Plateforme IA de prospection (proposition d’alternance)

Site de présentation interactif, autonome et 100 % frontend (React 19 + TypeScript + Vite, animations avec `motion`).
Projet indépendant de candidature : non affilié à American Express. Toutes les données de démonstration sont fictives.

## Lancer

```bash
cd front-end
npm install        # une seule fois
npm run dev        # http://localhost:5173 (s'ouvre automatiquement)
```

Version de production : `npm run build` puis `npm run preview` (http://localhost:4173).

## Où modifier quoi

| Besoin | Fichier |
| --- | --- |
| Coordonnées (e-mail, téléphone, LinkedIn…) | `src/config/contact.ts` (`null` = masqué) |
| Textes, titres, avertissements, hypothèses chiffrées | `src/content/site.ts` |
| Prospects fictifs de la maquette | `src/data/prospects.ts` |
| Pondération et seuils de priorité | `src/data/scoring.ts` |
| Étapes du processus | `src/data/flow.ts` |
| Composants d’architecture | `src/data/architecture.ts` |
| Indicateurs et protocole de validation | `src/data/metrics.ts` |
| Visuel de la carte | `src/assets/centurion-card.jpg` (même nom, ratio 361×229 ; une version haute définition est recommandée) |
| Couleurs, typographie, espacements | `src/styles/global.css` (variables `:root`) |

## Structure

```
src/
  components/   un dossier par section (hero, savings, need, flow, product, architecture, validation, conclusion)
                + layout/ (en-tête, progression) et ui/ (révélations, icônes, gestion d'erreurs)
  content/      textes
  data/         données fictives et calcul du score
  config/       coordonnées
  hooks/        section active, media queries, préférence de mouvement
```

## Accessibilité et performances

- `prefers-reduced-motion` respecté : l’introduction et les graphiques s’affichent directement dans leur état final.
- Aucun scroll hijacking ; l’introduction s’interrompt au premier scroll, clic ou appui sur une touche.
- Navigation clavier (onglets avec flèches, focus visibles), lien d’évitement, libellés pour lecteurs d’écran.
- Chaque section est isolée par un `ErrorBoundary`.
