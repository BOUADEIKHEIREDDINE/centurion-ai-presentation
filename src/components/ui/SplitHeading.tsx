import { motion } from 'motion/react';
import { useMotionEnabled } from '../../hooks/useMotionPreference';
import { easeOut, viewportOnce } from './animation';

interface SplitHeadingProps {
  text: string;
  as?: 'h1' | 'h2';
  className?: string;
  id?: string;
  /** Mots (exacts) à afficher en serif italique. */
  emphasis?: string[];
}

/** Titre révélé mot à mot, par masque. Le texte complet reste exposé aux lecteurs d'écran. */
export function SplitHeading({ text, as = 'h2', className, id, emphasis = [] }: SplitHeadingProps) {
  const enabled = useMotionEnabled();
  const Tag = as;
  const words = text.split(' ');

  return (
    <Tag className={className} id={id} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial={enabled ? 'hidden' : false}
        whileInView="visible"
        viewport={viewportOnce}
        transition={{ staggerChildren: 0.045 }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="split-word">
              <motion.span
                className={emphasis.includes(word) ? 'serif-italic' : undefined}
                style={{ display: 'inline-block' }}
                variants={{
                  hidden: { y: '105%', opacity: 0 },
                  visible: { y: '0%', opacity: 1, transition: { duration: 0.85, ease: easeOut } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
