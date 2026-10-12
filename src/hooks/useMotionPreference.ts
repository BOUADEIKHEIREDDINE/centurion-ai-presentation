import { useReducedMotion } from 'motion/react';

/** true quand les animations doivent être jouées (pas de prefers-reduced-motion). */
export function useMotionEnabled(): boolean {
  return !useReducedMotion();
}
