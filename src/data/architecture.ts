import type { ArchitectureNode } from '../types';

/** Technologies indicatives : le choix final dépendra des contraintes de l'entreprise. */
export const architectureNodes: ArchitectureNode[] = [
  {
    id: 'sources',
    title: 'Sources de données',
    tagline: 'Publiques et autorisées',
    role: 'Point d’entrée unique vers les sources validées par la conformité : registres d’entreprises, comptes publiés, presse économique sous licence.',
    technologies: ['API officielles de registres', 'Flux presse sous licence', 'Liste blanche de domaines'],
    safeguards: ['Respect des conditions d’utilisation', 'Aucune donnée privée ou sensible'],
  },
  {
    id: 'ingestion',
    title: 'Pipeline d’ingestion',
    tagline: 'Collecte, normalisation, traçabilité',
    role: 'Collecte planifiée, normalisation des formats, horodatage, dédoublonnage et conservation de la provenance de chaque document.',
    technologies: ['Python', 'Orchestrateur (Airflow ou Prefect)', 'Stockage objet versionné'],
    safeguards: ['Journal de provenance', 'Durées de conservation RGPD'],
  },
  {
    id: 'extraction',
    title: 'Extraction IA',
    tagline: 'LLM + schéma structuré',
    role: 'Extraction d’entités (personnes, fonctions, entreprises, montants) vers un schéma typé, avec citation du passage source et score de confiance.',
    technologies: ['LLM avec sortie JSON contrainte', 'NER & résolution d’entités', 'Jeu d’évaluation annoté'],
    safeguards: ['Refus d’extraire sans source', 'Contrôle des homonymes'],
  },
  {
    id: 'database',
    title: 'Base structurée',
    tagline: 'Fiches, sources, historique',
    role: 'Stockage des fiches, des faits et de leurs sources, de l’historique des versions et des décisions humaines.',
    technologies: ['PostgreSQL', 'Index vectoriel (pgvector) pour la recherche', 'Contrôle d’accès par rôle'],
    safeguards: ['Chiffrement', 'Traçabilité des modifications'],
  },
  {
    id: 'analysis',
    title: 'Moteur d’analyse',
    tagline: 'Synthèse & priorisation explicables',
    role: 'Génération de synthèses sourcées et calcul d’un score de priorité à partir de critères pondérés, avec la contribution de chacun.',
    technologies: ['Règles métier versionnées', 'Modèle de scoring interprétable', 'Génération augmentée par récupération (RAG)'],
    safeguards: ['Critères validés par le métier', 'Pas de décision automatique'],
  },
  {
    id: 'interface',
    title: 'Interface utilisateur',
    tagline: 'File de revue des analystes',
    role: 'Recherche, comparaison des dossiers, consultation des sources, retours et décisions des analystes.',
    technologies: ['React + TypeScript', 'API interne authentifiée', 'Journal d’audit'],
    safeguards: ['Décision humaine obligatoire', 'Retours réinjectés dans l’évaluation'],
  },
];
