import type { Prospect } from '../types';

/**
 * DONNÉES ENTIÈREMENT FICTIVES.
 * Les prospects, entreprises, chiffres et sources ci-dessous sont inventés pour la démonstration.
 * Toute ressemblance avec des personnes ou des sociétés existantes serait fortuite.
 */
export const prospects: Prospect[] = [
  {
    id: 'a',
    code: 'Prospect A',
    role: 'Présidente',
    sector: 'Industrie',
    country: 'France',
    countryCode: 'FR',
    confidence: 'elevee',
    summary:
      'Présidente depuis 2014 d’un groupe industriel familial [s1], dont le chiffre d’affaires publié progresse sur trois exercices [s2]. Administratrice d’une seconde société du secteur selon le registre [s1]. Un mandat supplémentaire n’est cité que par la presse et reste à confirmer [s4].',
    facts: [
      { label: 'Fonction actuelle', value: 'Présidente du directoire', status: 'verifie', sourceIds: ['s1'] },
      { label: 'Ancienneté', value: 'Depuis 2014', status: 'verifie', sourceIds: ['s1'] },
      { label: 'Mandat d’administratrice', value: 'Société Orvane Composites', status: 'verifie', sourceIds: ['s1'] },
      { label: 'Mandat associatif', value: 'Cité par la presse uniquement', status: 'estime', sourceIds: ['s4'] },
      { label: 'Détention du capital', value: 'Non documentée', status: 'manquant', sourceIds: [] },
    ],
    companies: [
      { name: 'Groupe Valmor Industrie', role: 'Présidente du directoire', sector: 'Équipements industriels', since: '2014' },
      { name: 'Orvane Composites', role: 'Administratrice', sector: 'Matériaux', since: '2019' },
    ],
    financials: [
      { label: 'CA publié du groupe', value: '412 M€', year: '2024', sourceId: 's2' },
      { label: 'Résultat net publié', value: '31 M€', year: '2024', sourceId: 's2' },
      { label: 'Effectif déclaré', value: '2 300', year: '2024', sourceId: 's3' },
    ],
    criteria: [
      { label: 'Fonction de direction vérifiée', weight: 0.3, met: true, explanation: 'Mandat confirmé par le registre légal.' },
      { label: 'Taille de l’entreprise', weight: 0.25, met: true, explanation: 'Chiffre d’affaires publié supérieur au seuil défini.' },
      { label: 'Ancienneté dans la fonction', weight: 0.15, met: true, explanation: 'Plus de cinq ans dans la fonction actuelle.' },
      { label: 'Présence internationale', weight: 0.16, met: true, explanation: 'Filiales déclarées dans quatre pays.' },
      { label: 'Identité sans ambiguïté', weight: 0.14, met: 'incertain', explanation: 'Un homonyme existe dans un autre secteur : à écarter.' },
    ],
    uncertainties: ['Homonyme à écarter dans le secteur immobilier', 'Mandat associatif cité par la presse seulement'],
    sources: [
      { id: 's1', type: 'Registre légal', title: 'Extrait du registre des sociétés — Groupe Valmor Industrie', date: '03/2025', reliability: 'Primaire', excerpt: '« Présidente du directoire, nommée le 12/06/2014. Administratrice d’Orvane Composites depuis 2019. »' },
      { id: 's2', type: 'Comptes publiés', title: 'Comptes annuels consolidés 2024', date: '05/2025', reliability: 'Primaire', excerpt: '« Chiffre d’affaires consolidé : 412 M€ (2023 : 377 M€). Résultat net part du groupe : 31 M€. »' },
      { id: 's3', type: 'Site institutionnel', title: 'Rapport d’activité — page « Le groupe »', date: '02/2025', reliability: 'Secondaire', excerpt: '« 2 300 collaborateurs, implantations en France, Allemagne, Pologne et Mexique. »' },
      { id: 's4', type: 'Presse économique', title: 'Portrait dans un quotidien économique régional', date: '11/2024', reliability: 'Secondaire', excerpt: '« … également engagée au conseil d’une fondation pour l’apprentissage industriel. »' },
      { id: 's5', type: 'Communiqué', title: 'Communiqué de presse — acquisition d’une filiale', date: '09/2024', reliability: 'Secondaire', excerpt: '« Le groupe annonce l’acquisition d’un fabricant de composants basé en Pologne. »' },
    ],
  },
  {
    id: 'b',
    code: 'Prospect B',
    role: 'Fondateur & CEO',
    sector: 'Logiciel',
    country: 'Allemagne',
    countryCode: 'DE',
    confidence: 'moyenne',
    summary:
      'Fondateur d’un éditeur de logiciels B2B [s1] ayant annoncé une levée de fonds significative [s2]. Les comptes de la société ne sont pas publiés : aucun élément financier vérifié n’est disponible. La valorisation citée par la presse est une estimation [s3].',
    facts: [
      { label: 'Fonction actuelle', value: 'Fondateur et directeur général', status: 'verifie', sourceIds: ['s1'] },
      { label: 'Levée de fonds', value: 'Série C annoncée', status: 'verifie', sourceIds: ['s2'] },
      { label: 'Valorisation', value: 'Citée par la presse', status: 'estime', sourceIds: ['s3'] },
      { label: 'Chiffre d’affaires', value: 'Non publié', status: 'manquant', sourceIds: [] },
    ],
    companies: [{ name: 'Kestrel Systems GmbH', role: 'Fondateur & CEO', sector: 'Logiciel B2B', since: '2016' }],
    financials: [
      { label: 'Montant levé (annoncé)', value: '60 M€', year: '2025', sourceId: 's2' },
      { label: 'Chiffre d’affaires', value: null, year: null, sourceId: null },
    ],
    criteria: [
      { label: 'Fonction de direction vérifiée', weight: 0.3, met: true, explanation: 'Registre et communiqué concordants.' },
      { label: 'Dynamique de l’entreprise', weight: 0.25, met: true, explanation: 'Levée de fonds récente confirmée par communiqué.' },
      { label: 'Taille de l’entreprise', weight: 0.2, met: 'incertain', explanation: 'Aucun chiffre d’affaires publié.' },
      { label: 'Identité sans ambiguïté', weight: 0.25, met: true, explanation: 'Aucun homonyme détecté.' },
    ],
    uncertainties: ['Comptes non publiés : taille réelle inconnue', 'Valorisation uniquement estimée par la presse'],
    sources: [
      { id: 's1', type: 'Registre légal', title: 'Extrait du registre du commerce — Kestrel Systems GmbH', date: '01/2025', reliability: 'Primaire', excerpt: '« Geschäftsführer : fondateur, inscrit depuis 2016. »' },
      { id: 's2', type: 'Communiqué', title: 'Communiqué — annonce de la série C', date: '04/2025', reliability: 'Secondaire', excerpt: '« Kestrel Systems annonce une levée de 60 M€ pour accélérer son expansion européenne. »' },
      { id: 's3', type: 'Presse économique', title: 'Article sur les scale-ups logicielles', date: '05/2025', reliability: 'Secondaire', excerpt: '« … une valorisation que plusieurs sources estiment proche du demi-milliard. »' },
    ],
  },
  {
    id: 'c',
    code: 'Prospect C',
    role: 'Directrice générale',
    sector: 'Luxe',
    country: 'Italie',
    countryCode: 'IT',
    confidence: 'elevee',
    summary:
      'Directrice générale d’une maison de maroquinerie [s1] dont les comptes sont publiés [s2]. Fonction salariée récente (2023) : l’ancienneté dans le poste reste faible. Profil documenté et sans ambiguïté d’identité.',
    facts: [
      { label: 'Fonction actuelle', value: 'Directrice générale', status: 'verifie', sourceIds: ['s1'] },
      { label: 'Ancienneté', value: 'Depuis 2023', status: 'verifie', sourceIds: ['s1'] },
      { label: 'Parcours antérieur', value: 'Direction commerciale, même secteur', status: 'verifie', sourceIds: ['s4'] },
      { label: 'Rémunération', value: 'Non publiée', status: 'manquant', sourceIds: [] },
    ],
    companies: [{ name: 'Casa Brenti Pelletteria', role: 'Directrice générale', sector: 'Maroquinerie de luxe', since: '2023' }],
    financials: [
      { label: 'CA publié de la société', value: '185 M€', year: '2024', sourceId: 's2' },
      { label: 'Résultat net publié', value: '22 M€', year: '2024', sourceId: 's2' },
    ],
    criteria: [
      { label: 'Fonction de direction vérifiée', weight: 0.3, met: true, explanation: 'Nomination publiée au registre.' },
      { label: 'Taille de l’entreprise', weight: 0.25, met: true, explanation: 'Chiffre d’affaires publié au-dessus du seuil.' },
      { label: 'Ancienneté dans la fonction', weight: 0.2, met: false, explanation: 'Moins de trois ans dans le poste.' },
      { label: 'Identité sans ambiguïté', weight: 0.25, met: true, explanation: 'Aucun homonyme détecté.' },
    ],
    uncertainties: ['Ancienneté courte dans la fonction actuelle'],
    sources: [
      { id: 's1', type: 'Registre légal', title: 'Visura camerale — Casa Brenti Pelletteria', date: '02/2025', reliability: 'Primaire', excerpt: '« Amministratore delegato, nomina del 15/03/2023. »' },
      { id: 's2', type: 'Comptes publiés', title: 'Bilancio d’esercizio 2024', date: '06/2025', reliability: 'Primaire', excerpt: '« Ricavi : 185 M€. Utile netto : 22 M€. »' },
      { id: 's3', type: 'Site institutionnel', title: 'Page « Gouvernance »', date: '01/2025', reliability: 'Secondaire', excerpt: '« Notre directrice générale a rejoint la maison en 2023. »' },
      { id: 's4', type: 'Presse économique', title: 'Annonce de nomination', date: '03/2023', reliability: 'Secondaire', excerpt: '« … auparavant directrice commerciale d’une autre maison du secteur. »' },
    ],
  },
  {
    id: 'd',
    code: 'Prospect D',
    role: 'Dirigeant',
    sector: 'Immobilier',
    country: 'Espagne',
    countryCode: 'ES',
    confidence: 'moyenne',
    summary:
      'Dirigeant d’une foncière régionale [s1]. Les comptes publiés sont anciens (2022) [s2] et l’activité récente n’est documentée que par la presse [s3]. Plusieurs informations doivent être actualisées avant revue.',
    facts: [
      { label: 'Fonction actuelle', value: 'Administrateur unique', status: 'verifie', sourceIds: ['s1'] },
      { label: 'Activité récente', value: 'Nouveaux projets cités par la presse', status: 'estime', sourceIds: ['s3'] },
      { label: 'Comptes récents', value: 'Derniers comptes : 2022', status: 'manquant', sourceIds: ['s2'] },
    ],
    companies: [{ name: 'Inmobiliaria Sierra Clara', role: 'Administrateur unique', sector: 'Foncière', since: '2011' }],
    financials: [
      { label: 'CA publié', value: '48 M€', year: '2022', sourceId: 's2' },
      { label: 'Comptes 2023–2024', value: null, year: null, sourceId: null },
    ],
    criteria: [
      { label: 'Fonction de direction vérifiée', weight: 0.3, met: true, explanation: 'Mandat confirmé par le registre.' },
      { label: 'Taille de l’entreprise', weight: 0.25, met: 'incertain', explanation: 'Données financières datées de 2022.' },
      { label: 'Fraîcheur des données', weight: 0.2, met: false, explanation: 'Dernière source primaire de plus de deux ans.' },
      { label: 'Identité sans ambiguïté', weight: 0.25, met: true, explanation: 'Aucun homonyme détecté.' },
    ],
    uncertainties: ['Données financières anciennes', 'Activité récente non confirmée par une source primaire'],
    sources: [
      { id: 's1', type: 'Registre légal', title: 'Registro Mercantil — Inmobiliaria Sierra Clara', date: '12/2024', reliability: 'Primaire', excerpt: '« Administrador único desde 2011. »' },
      { id: 's2', type: 'Comptes publiés', title: 'Cuentas anuales 2022', date: '07/2023', reliability: 'Primaire', excerpt: '« Importe neto de la cifra de negocios : 48 M€. »' },
      { id: 's3', type: 'Presse économique', title: 'Article sur l’immobilier régional', date: '02/2025', reliability: 'Secondaire', excerpt: '« … la foncière prépare deux nouveaux programmes résidentiels. »' },
    ],
  },
  {
    id: 'e',
    code: 'Prospect E',
    role: 'Associé',
    sector: 'Conseil',
    country: 'Royaume-Uni',
    countryCode: 'UK',
    confidence: 'faible',
    summary:
      'Associé d’un cabinet de conseil selon son site institutionnel [s1]. Le registre ne permet pas de confirmer le mandat et deux homonymes ont été détectés dans le même pays. Identification à confirmer avant toute analyse.',
    facts: [
      { label: 'Fonction actuelle', value: 'Associé (site du cabinet)', status: 'estime', sourceIds: ['s1'] },
      { label: 'Mandat au registre', value: 'Non confirmé', status: 'manquant', sourceIds: ['s2'] },
      { label: 'Identité', value: 'Deux homonymes détectés', status: 'manquant', sourceIds: [] },
    ],
    companies: [{ name: 'Harrow & Lisle Advisory LLP', role: 'Associé (non confirmé)', sector: 'Conseil en stratégie', since: '—' }],
    financials: [{ label: 'Comptes du cabinet', value: null, year: null, sourceId: null }],
    criteria: [
      { label: 'Fonction de direction vérifiée', weight: 0.3, met: 'incertain', explanation: 'Seule source : le site du cabinet.' },
      { label: 'Taille de l’entreprise', weight: 0.25, met: 'incertain', explanation: 'Aucun chiffre public exploitable.' },
      { label: 'Identité sans ambiguïté', weight: 0.45, met: false, explanation: 'Deux homonymes : identification non fiable.' },
    ],
    uncertainties: ['Deux homonymes dans le même pays', 'Mandat non confirmé par une source primaire'],
    sources: [
      { id: 's1', type: 'Site institutionnel', title: 'Page « Notre équipe » du cabinet', date: '01/2025', reliability: 'Secondaire', excerpt: '« Partner, Strategy & Transformation. »' },
      { id: 's2', type: 'Registre légal', title: 'Recherche au registre des sociétés', date: '03/2025', reliability: 'Primaire', excerpt: 'Aucun membre correspondant de manière univoque parmi les associés déclarés.' },
    ],
  },
];
