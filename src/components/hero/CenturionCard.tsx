import { motion, useMotionValue, useSpring } from 'motion/react';
import { useState, type PointerEvent } from 'react';
import cardImage from '../../assets/centurion-card.jpg';
import './CenturionCard.css';

interface CenturionCardProps {
  /** Active l'inclinaison au survol (souris uniquement). */
  interactive: boolean;
}

/**
 * Visuel de carte. Utilise l'image fournie dans src/assets ; si elle ne se charge pas,
 * affiche une carte noire générique en CSS, sans logo ni marque.
 */
export function CenturionCard({ interactive }: CenturionCardProps) {
  const [failed, setFailed] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 160, damping: 20 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx.set((0.5 - py) * 10);
    ry.set((px - 0.5) * 14);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div className="ccard" style={{ rotateX, rotateY }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {failed ? (
        <div className="ccard__fallback" role="img" aria-label="Représentation générique d’une carte de paiement noire">
          <span className="ccard__chip" />
          <span className="ccard__fallback-label">Carte illustrative</span>
        </div>
      ) : (
        <img
          className="ccard__img"
          src={cardImage}
          alt="Carte Centurion d’American Express, visuel illustratif"
          width={361}
          height={229}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
      <span className="ccard__sheen" aria-hidden="true" />
      <span className="ccard__edge" aria-hidden="true" />
    </motion.div>
  );
}
