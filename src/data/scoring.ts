import type { Criterion, Priority, Prospect } from '../types';

/** Critère rempli = poids complet, incertain = moitié, non rempli = zéro. */
const credit = (met: Criterion['met']): number => (met === true ? 1 : met === 'incertain' ? 0.5 : 0);

export const criterionContribution = (c: Criterion): number => c.weight * credit(c.met);

export const computeScore = (criteria: Criterion[]): number =>
  Math.round(criteria.reduce((sum, c) => sum + criterionContribution(c), 0) * 100);

export const priorityFromScore = (score: number): Priority =>
  score >= 85 ? 'haute' : score >= 60 ? 'moyenne' : 'basse';

export interface ScoredProspect extends Prospect {
  score: number;
  priority: Priority;
}

export const scoreProspects = (list: Prospect[]): ScoredProspect[] =>
  list
    .map((p) => {
      const score = computeScore(p.criteria);
      return { ...p, score, priority: priorityFromScore(score) };
    })
    .sort((a, b) => b.score - a.score);
