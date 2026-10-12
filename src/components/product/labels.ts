import type { Confidence, FactStatus, Priority } from '../../types';

type Tone = 'ok' | 'hypo' | 'risk';

export const confidenceLabel: Record<Confidence, { label: string; tone: Tone }> = {
  elevee: { label: 'Élevée', tone: 'ok' },
  moyenne: { label: 'Moyenne', tone: 'hypo' },
  faible: { label: 'Faible', tone: 'risk' },
};

export const priorityLabel: Record<Priority, { label: string; rank: number }> = {
  haute: { label: 'Haute', rank: 3 },
  moyenne: { label: 'Moyenne', rank: 2 },
  basse: { label: 'Basse', rank: 1 },
};

export const factLabel: Record<FactStatus, { label: string; tone: Tone }> = {
  verifie: { label: 'Vérifié', tone: 'ok' },
  estime: { label: 'Estimé', tone: 'hypo' },
  manquant: { label: 'Manquant', tone: 'risk' },
};

export type Decision = 'retenu' | 'verification' | 'ecarte';

export const decisionLabel: Record<Decision, string> = {
  retenu: 'Retenu pour revue',
  verification: 'Vérification demandée',
  ecarte: 'Écarté',
};

export type DetailTab = 'synthese' | 'faits' | 'finances' | 'sources' | 'criteres';

export const detailTabs: { id: DetailTab; label: string }[] = [
  { id: 'synthese', label: 'Synthèse IA' },
  { id: 'faits', label: 'Faits & incertitudes' },
  { id: 'finances', label: 'Entreprises & finances' },
  { id: 'sources', label: 'Sources' },
  { id: 'criteres', label: 'Critères' },
];
