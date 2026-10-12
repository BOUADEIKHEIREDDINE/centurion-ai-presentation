import type { NavItem } from '../types';

export const navItems: NavItem[] = [
  { id: 'demonstration', label: 'Hypothèse' },
  { id: 'besoin', label: 'Besoin' },
  { id: 'fonctionnement', label: 'Fonctionnement' },
  { id: 'produit', label: 'Produit' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'validation', label: 'Validation' },
  { id: 'conclusion', label: 'Contact' },
];

/** Hypothèses illustratives — aucune n'est une mesure. */
export const hypothesis = {
  manualMinutes: 120,
  prospectsWithTool: 5,
  get toolMinutes() {
    return this.manualMinutes / this.prospectsWithTool;
  },
  get reductionPct() {
    return Math.round((1 - this.toolMinutes / this.manualMinutes) * 100);
  },
} as const;

export const disclaimers = {
  hypothesis:
    'Hypothèse de travail à valider par expérimentation. Ces chiffres ne constituent pas des résultats mesurés.',
  fictional: 'Démonstration frontend · données entièrement fictives · aucune connexion à des données réelles',
  independent:
    "Proposition de projet indépendante réalisée dans le cadre d'une candidature en alternance. Ce site n'est ni affilié, ni approuvé, ni publié par American Express. American Express et Centurion sont des marques de leurs propriétaires respectifs ; le visuel de carte est utilisé à titre illustratif.",
};

export const hero = {
  eyebrow: "Proposition de projet · Alternance de deux ans",
  title: 'Une plateforme d’IA pour identifier et analyser les prospects à fort potentiel',
  context: 'Projet envisagé pour les équipes American Express Centurion',
  kpiLabel: 'de temps moyen par prospect',
  kpiNote: 'Objectif hypothétique, à valider',
};

export const need = {
  kicker: 'A · Le besoin métier',
  title: 'Transformer la recherche de prospects en un processus plus structuré.',
  lead:
    "L'objectif : assister les équipes dans la recherche, la documentation et l'analyse de prospects potentiels pour la carte Centurion — sans jamais remplacer leur jugement.",
  assumptionTitle: 'Le processus manuel, tel que je l’imagine',
  assumptionNote:
    "Hypothèse à confirmer avec American Express : ce site décrit une proposition, pas les pratiques internes de l'entreprise.",
  pains: [
    {
      title: 'Des sources dispersées',
      text: 'Registres, comptes publiés, presse économique : chaque dossier suppose de croiser manuellement plusieurs sources hétérogènes.',
    },
    {
      title: 'Une traçabilité fragile',
      text: "Il est difficile de distinguer rapidement ce qui est vérifié, ce qui est estimé et ce qui manque, ou de retrouver d'où vient une information.",
    },
    {
      title: 'Des critères implicites',
      text: "Sans grille commune, deux analystes peuvent prioriser différemment le même profil. L'outil rend chaque critère explicite et discutable.",
    },
  ],
  principles: [
    'Sources publiques autorisées uniquement',
    'Faits, estimations et manques séparés',
    'Une fortune estimée n’est jamais un critère suffisant',
    'Aucun avis sur l’éligibilité à la carte',
    'Décision finale toujours humaine',
  ],
};

export const conclusion = {
  title: 'L’IA pour mieux rechercher, documenter et décider.',
  text:
    "Ce projet est une proposition initiale, formulée dans le cadre de ma recherche d'une alternance de deux ans. Il sera conduit dans le respect du RGPD, avec des sources autorisées, une gestion prudente des homonymes, une traçabilité complète et un contrôle humain systématique — sous réserve de validation par les équipes juridiques, conformité et sécurité.",
  openness:
    "Si les besoins d'American Express sont différents, je suis prêt à travailler sur un autre sujet en IA ou en data science.",
};
