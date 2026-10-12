import type { ValidationMetric } from '../types';

export const validationMetrics: ValidationMetric[] = [
  {
    id: 'temps',
    label: 'Temps moyen de traitement par prospect',
    hypothesis: '120 min → 24 min',
    method: 'Chronométrage, vérification humaine incluse',
    baseline: 120,
    target: 24,
    unit: 'min',
  },
  {
    id: 'debit',
    label: 'Prospects préqualifiés par heure',
    hypothesis: '0,5 → 2,5',
    method: 'Dossiers complets par heure de travail',
    baseline: 0.5,
    target: 2.5,
    unit: '/ h',
  },
  {
    id: 'exactitude',
    label: 'Exactitude des informations extraites',
    hypothesis: 'À mesurer',
    method: 'Comparaison avec une annotation manuelle',
  },
  {
    id: 'sources',
    label: 'Affirmations avec source vérifiable',
    hypothesis: 'À mesurer',
    method: 'Contrôle de chaque affirmation des fiches',
  },
  {
    id: 'erreurs',
    label: 'Taux d’erreurs d’identification',
    hypothesis: 'À mesurer',
    method: 'Revue des homonymes et des doublons',
  },
  {
    id: 'utilite',
    label: 'Utilité des synthèses pour les analystes',
    hypothesis: 'À mesurer',
    method: 'Note et commentaires des analystes',
  },
];

export const protocolSteps = [
  {
    title: 'Un échantillon commun',
    text: 'Un même lot de prospects, défini avec les équipes, sert de base de comparaison.',
  },
  {
    title: 'Processus de référence',
    text: 'Le lot est traité selon la méthode manuelle actuelle, chronométrée et annotée.',
  },
  {
    title: 'Processus assisté',
    text: 'Le même lot est traité avec le prototype, vérification humaine comprise.',
  },
  {
    title: 'Comparaison',
    text: 'Temps et qualité sont comparés. Un gain de temps ne compte que si la qualité est au moins équivalente.',
  },
];
