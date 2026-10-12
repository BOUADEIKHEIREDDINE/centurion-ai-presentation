import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { architectureNodes } from '../../data/architecture';
import { useMotionEnabled } from '../../hooks/useMotionPreference';
import { easeOut } from '../ui/animation';
import { Check } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SplitHeading } from '../ui/SplitHeading';
import './Architecture.css';

export function ArchitectureSection() {
  const motionEnabled = useMotionEnabled();
  const [selectedId, setSelectedId] = useState(architectureNodes[0]!.id);
  const selected = architectureNodes.find((n) => n.id === selectedId) ?? architectureNodes[0]!;

  return (
    <section id="architecture" className="section arch" data-tone="dark" aria-labelledby="arch-title">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <p className="kicker">D · L’architecture technique</p>
          </Reveal>
          <SplitHeading id="arch-title" text="Un pipeline lisible, de la donnée brute à l’écran de l’analyste." emphasis={['lisible,']} />
          <Reveal delay={0.1}>
            <p>Cliquez sur un composant pour en révéler le rôle, les technologies envisagées et les garde-fous.</p>
          </Reveal>
        </header>

        <ol className="arch__pipeline" aria-label="Composants du système">
          {architectureNodes.map((node, i) => {
            const active = node.id === selected.id;
            return (
              <motion.li
                key={node.id}
                className="arch__item"
                initial={motionEnabled ? { opacity: 0, y: 20 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: easeOut }}
              >
                <button
                  type="button"
                  className={`arch__node${active ? ' is-active' : ''}`}
                  aria-expanded={active}
                  aria-controls="arch-detail"
                  onClick={() => setSelectedId(node.id)}
                >
                  <span className="arch__num tabular">{String(i + 1).padStart(2, '0')}</span>
                  <span className="arch__title">{node.title}</span>
                  <span className="arch__tagline">{node.tagline}</span>
                </button>
                {i < architectureNodes.length - 1 && (
                  <span className="arch__link" aria-hidden="true">
                    <span className="arch__packet" style={{ animationDelay: `${i * 0.35}s` }} />
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>

        <div className="arch__detail" id="arch-detail" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.id}
              className="arch__detail-inner"
              initial={motionEnabled ? { opacity: 0, x: 16 } : false}
              animate={{ opacity: 1, x: 0 }}
              exit={motionEnabled ? { opacity: 0, x: -12 } : undefined}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              <div>
                <p className="arch__detail-kicker">Composant</p>
                <h3>{selected.title}</h3>
                <p className="arch__role">{selected.role}</p>
              </div>
              <div>
                <p className="arch__detail-kicker">Technologies envisagées</p>
                <ul className="arch__chips">
                  {selected.technologies.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="arch__detail-kicker">Garde-fous</p>
                <ul className="arch__guards">
                  {selected.safeguards.map((s) => (
                    <li key={s}>
                      <Check /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="arch__note">
          Architecture et technologies indicatives : les choix définitifs dépendront des contraintes de l’entreprise —
          sécurité, hébergement, outils déjà en place et validation par les équipes juridiques et conformité.
        </p>
      </div>
    </section>
  );
}
