import { motion } from 'motion/react';
import { need } from '../../content/site';
import { useMotionEnabled } from '../../hooks/useMotionPreference';
import { easeOut, viewportOnce } from '../ui/animation';
import { Check } from '../ui/Icons';

/** Position (en % de la zone) et inclinaison de chaque source éparpillée. */
const scatter = [
  { x: 6, y: 4, r: -7 },
  { x: 20, y: 25, r: 4 },
  { x: 0, y: 47, r: -3 },
  { x: 30, y: 67, r: 6 },
  { x: 10, y: 86, r: -8 },
];

/** Hauteur de référence du schéma, partagée par la zone éparpillée et les liaisons. */
const H = 260;
const CHIP_H = 26;

/** Schéma « sources dispersées → dossier structuré » à côté du titre du besoin. */
export function NeedVisual() {
  const enabled = useMotionEnabled();
  const { visual } = need;
  const chips = visual.sources.map((label, i) => ({ label, ...(scatter[i] ?? { x: 0, y: 0, r: 0 }) }));

  const inView = enabled
    ? { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: viewportOnce }
    : {};

  return (
    <motion.figure className="need-visual" aria-hidden="true" {...inView}>
      <span className="need-visual__label">{visual.beforeLabel}</span>
      <span className="need-visual__label need-visual__label--after">{visual.afterLabel}</span>

      <div className="need-visual__scatter">
        {chips.map((s, i) => {
          return (
            <motion.span
              key={s.label}
              className="need-visual__chip"
              style={{ left: `${s.x}%`, top: `${s.y}%`, rotate: enabled ? undefined : s.r }}
              variants={{
                hidden: { opacity: 0, x: -24, rotate: s.r * 2.5 },
                visible: {
                  opacity: 1,
                  x: 0,
                  rotate: s.r,
                  transition: { duration: 0.9, delay: 0.1 + i * 0.08, ease: easeOut },
                },
              }}
            >
              {s.label}
            </motion.span>
          );
        })}
      </div>

      <svg className="need-visual__links" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none">
        {chips.map((s, i) => {
          const y0 = (s.y / 100) * H + CHIP_H / 2;
          const y1 = H / 2;
          return (
            <motion.path
              key={s.label}
              d={`M0 ${y0} C 55 ${y0}, 45 ${y1}, 100 ${y1}`}
              vectorEffect="non-scaling-stroke"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 1, delay: 0.5 + i * 0.06, ease: easeOut },
                },
              }}
            />
          );
        })}
      </svg>

      <motion.div
        className="need-visual__card"
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.9, ease: easeOut } },
        }}
      >
        <p className="need-visual__card-title">{visual.cardTitle}</p>
        <ul>
          {visual.rows.map((row, i) => (
            <motion.li
              key={row.label}
              variants={{
                hidden: { opacity: 0, x: 10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6, delay: 1.15 + i * 0.12, ease: easeOut },
                },
              }}
            >
              <span>{row.label}</span>
              <span className={`tag tag--dot tag--${row.status}`}>{row.statusLabel}</span>
            </motion.li>
          ))}
        </ul>
        <p className="need-visual__decision">
          <Check width={14} height={14} />
          {visual.decision}
        </p>
      </motion.div>
    </motion.figure>
  );
}
