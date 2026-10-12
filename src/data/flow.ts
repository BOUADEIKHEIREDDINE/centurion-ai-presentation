import type { FlowStep } from '../types';

export const flowSteps: FlowStep[] = [
  {
    id: 'recherche',
    index: 1,
    title: 'Recherche',
    short: 'Sources publiques autorisées',
    description:
      'Interroger des sources publiques dont l’usage est autorisé — registres d’entreprises, comptes publiés, presse économique — à partir de critères définis avec les équipes métier.',
    input: 'Critères métier : secteur, pays, fonction, taille d’entreprise',
    output: 'Liste de candidats bruts, avec l’origine de chaque résultat',
    safeguard: 'Liste blanche de sources validée par la conformité',
  },
  {
    id: 'collecte',
    index: 2,
    title: 'Collecte & vérification',
    short: 'Provenance, doublons, dates',
    description:
      'Rassembler les documents utiles, contrôler leur provenance et leur date, détecter les doublons et signaler les homonymes possibles avant toute analyse.',
    input: 'Résultats bruts et documents sources',
    output: 'Corpus horodaté, dédoublonné, chaque pièce reliée à sa source',
    safeguard: 'Homonymes signalés, jamais fusionnés automatiquement',
  },
  {
    id: 'extraction',
    index: 3,
    title: 'Extraction par IA',
    short: 'Structuration des informations',
    description:
      'Un modèle de langage extrait fonctions, mandats, entreprises et éléments financiers publics dans un schéma structuré. Chaque champ extrait conserve un lien vers le passage qui le justifie.',
    input: 'Documents vérifiés',
    output: 'Données structurées (fonctions, entreprises, chiffres publics) citées',
    safeguard: 'Aucune valeur sans passage source ; sinon « manquant »',
  },
  {
    id: 'fiches',
    index: 4,
    title: 'Fiches documentées',
    short: 'Faits, estimations, manques',
    description:
      'Générer pour chaque prospect une fiche lisible qui sépare clairement les faits vérifiés, les estimations et les informations manquantes, avec une synthèse sourcée.',
    input: 'Données structurées et sources',
    output: 'Fiche prospect avec synthèse et références consultables',
    safeguard: 'Chaque affirmation de la synthèse renvoie à une source',
  },
  {
    id: 'priorisation',
    index: 5,
    title: 'Analyse & priorisation',
    short: 'Critères explicables',
    description:
      'Classer les dossiers selon des critères métier explicites et pondérés. Le score n’est pas une boîte noire : la contribution de chaque critère est visible et discutable.',
    input: 'Fiches documentées et grille de critères',
    output: 'File de revue triée, avec justification de chaque rang',
    safeguard: 'Pas de critère sensible ; pas d’avis sur l’éligibilité',
  },
  {
    id: 'revue',
    index: 6,
    title: 'Revue humaine',
    short: 'Décision par un responsable',
    description:
      'Un analyste consulte la fiche, vérifie les sources, corrige si nécessaire et décide de la suite. L’outil prépare le travail ; il ne décide jamais.',
    input: 'File de revue priorisée',
    output: 'Décision humaine tracée, retours utilisés pour améliorer l’outil',
    safeguard: 'Validation humaine obligatoire avant toute action',
  },
];
