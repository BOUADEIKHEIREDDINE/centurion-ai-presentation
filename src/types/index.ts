export type SectionId =
  | 'intro'
  | 'demonstration'
  | 'besoin'
  | 'fonctionnement'
  | 'produit'
  | 'architecture'
  | 'validation'
  | 'conclusion';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface FlowStep {
  id: string;
  index: number;
  title: string;
  short: string;
  description: string;
  input: string;
  output: string;
  safeguard: string;
}

export type Confidence = 'elevee' | 'moyenne' | 'faible';
export type Priority = 'haute' | 'moyenne' | 'basse';
export type FactStatus = 'verifie' | 'estime' | 'manquant';

export interface Source {
  id: string;
  type: 'Registre légal' | 'Comptes publiés' | 'Presse économique' | 'Site institutionnel' | 'Communiqué';
  title: string;
  date: string;
  reliability: 'Primaire' | 'Secondaire';
  excerpt: string;
}

export interface Fact {
  label: string;
  value: string;
  status: FactStatus;
  sourceIds: string[];
}

export interface Company {
  name: string;
  role: string;
  sector: string;
  since: string;
}

export interface Financial {
  label: string;
  value: string | null;
  year: string | null;
  sourceId: string | null;
}

export interface Criterion {
  label: string;
  /** Contribution à la priorité, de 0 à 1. */
  weight: number;
  explanation: string;
  met: boolean | 'incertain';
}

export interface Prospect {
  id: string;
  code: string;
  role: string;
  sector: string;
  country: string;
  countryCode: string;
  confidence: Confidence;
  summary: string;
  facts: Fact[];
  companies: Company[];
  financials: Financial[];
  criteria: Criterion[];
  uncertainties: string[];
  sources: Source[];
}

export interface ArchitectureNode {
  id: string;
  title: string;
  tagline: string;
  role: string;
  technologies: string[];
  safeguards: string[];
}

export interface ValidationMetric {
  id: string;
  label: string;
  hypothesis: string;
  method: string;
  /** Valeurs de référence et cible, uniquement pour les indicateurs chiffrés en hypothèse. */
  baseline?: number;
  target?: number;
  unit?: string;
}

export interface ContactConfig {
  name: string;
  headline: string;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
}
