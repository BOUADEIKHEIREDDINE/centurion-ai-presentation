import { motion, useTransform, type MotionValue } from 'motion/react';
import { hypothesis } from '../../content/site';

export type RingStage = 'idle' | 'reference' | 'reducing' | 'final';

interface SavingsRingProps {
  /** Minutes affichées ; pilote à la fois l'arc et le compteur. */
  minutes: MotionValue<number>;
  /** Tracé du cercle de référence, de 0 à 1. */
  reference: MotionValue<number>;
  stage: RingStage;
}

const SIZE = 400;
const C = SIZE / 2;
const R = 168;
const { manualMinutes, prospectsWithTool, toolMinutes, reductionPct } = hypothesis;

/** Point sur le cercle pour une fraction de tour (0 = midi, sens horaire). */
const polar = (fraction: number, radius: number) => {
  const a = fraction * Math.PI * 2 - Math.PI / 2;
  return { x: C + radius * Math.cos(a), y: C + radius * Math.sin(a) };
};

export function SavingsRing({ minutes, reference, stage }: SavingsRingProps) {
  const arc = useTransform(minutes, (m) => Math.max(0, Math.min(1, m / manualMinutes)));
  const rounded = useTransform(minutes, (m) => Math.round(m));
  const assisted = stage === 'reducing' || stage === 'final';

  // Graduations : une par prospect traité dans le scénario assisté.
  const ticks = Array.from({ length: prospectsWithTool }, (_, i) => i / prospectsWithTool);
  const savedLabel = polar(0.62, R + 22);

  return (
    <figure className={`ring ring--${stage}`}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-labelledby="ring-title ring-desc"
        className="ring__svg"
      >
        <title id="ring-title">Temps moyen par prospect : référence manuelle et scénario assisté</title>
        <desc id="ring-desc">
          Le cercle complet représente {manualMinutes} minutes, le temps de référence du processus manuel. L’arc
          épais représente {toolMinutes} minutes par prospect dans le scénario assisté par IA, soit 20 % du cercle :
          une réduction théorique de {reductionPct} %. Hypothèse illustrative, non mesurée.
        </desc>

        <circle cx={C} cy={C} r={R} className="ring__track" />

        <g transform={`rotate(-90 ${C} ${C})`}>
          <motion.circle cx={C} cy={C} r={R} className="ring__reference" style={{ pathLength: reference }} />
          <motion.circle cx={C} cy={C} r={R} className="ring__active" style={{ pathLength: arc }} />
        </g>

        <g className="ring__ticks" aria-hidden="true">
          {ticks.map((f) => {
            const a = polar(f, R - 14);
            const b = polar(f, R + 14);
            return <line key={f} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
          })}
        </g>

        <text className="ring__saved" x={savedLabel.x} y={savedLabel.y} textAnchor="end" aria-hidden="true">
          −{manualMinutes - toolMinutes} min
        </text>
      </svg>

      <div className="ring__center" aria-hidden="true">
        <span className="ring__label">{assisted ? 'Assisté par IA' : 'Processus manuel'}</span>
        <motion.span className="ring__value serif tabular">{rounded}</motion.span>
        <span className="ring__unit">{assisted ? 'minutes par prospect' : 'minutes'}</span>
      </div>
    </figure>
  );
}
