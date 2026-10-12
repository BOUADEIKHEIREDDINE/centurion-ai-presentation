import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useMotionEnabled } from '../../hooks/useMotionPreference';
import { easeOut, viewportOnce } from './animation';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'p' | 'header';
}

/** Révèle son contenu à l'entrée dans le viewport. Statique si mouvement réduit. */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: RevealProps) {
  const enabled = useMotionEnabled();
  const Tag = motion[as];
  if (!enabled) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, delay, ease: easeOut }}
    >
      {children}
    </Tag>
  );
}
