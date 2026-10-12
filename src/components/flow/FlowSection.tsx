import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { flowSteps } from '../../data/flow';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useMotionEnabled } from '../../hooks/useMotionPreference';
import { easeOut } from '../ui/animation';
import { ArrowLeft, ArrowRight, Pause, Play } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SplitHeading } from '../ui/SplitHeading';
import './Flow.css';

const AUTOPLAY_MS = 4800;
const last = flowSteps.length - 1;

export function FlowSection() {
  const motionEnabled = useMotionEnabled();
  const vertical = useMediaQuery('(max-width: 960px)');
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = flowSteps[active] ?? flowSteps[0]!;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setActive((a) => (a >= last ? 0 : a + 1)), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  const select = (i: number, focus = false) => {
    const next = Math.max(0, Math.min(last, i));
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: last,
    };
    const target = keys[e.key];
    if (target === undefined) return;
    e.preventDefault();
    setPlaying(false);
    select(target, true);
  };

  return (
    <section id="fonctionnement" className="section flow" data-tone="navy" aria-labelledby="flow-title">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <p className="kicker">B · Le fonctionnement</p>
          </Reveal>
          <SplitHeading
            id="flow-title"
            text="Six étapes, de la source publique à la décision humaine."
            emphasis={['décision', 'humaine.']}
          />
          <Reveal delay={0.1}>
            <p>
              Survolez ou sélectionnez une étape pour voir ce qu’elle reçoit, ce qu’elle produit et le garde-fou qui
              l’encadre.
            </p>
          </Reveal>
        </header>

        <div className="flow__rail-wrap">
          <div className="flow__rail" aria-hidden="true">
            <motion.span
              className="flow__rail-fill"
              initial={false}
              animate={vertical ? { scaleX: 1, scaleY: active / last } : { scaleX: active / last, scaleY: 1 }}
              transition={{ duration: motionEnabled ? 0.7 : 0, ease: easeOut }}
            >
              <span className="flow__pulse" />
            </motion.span>
          </div>

          <div className="flow__steps" role="tablist" aria-label="Étapes du processus" onKeyDown={onKeyDown}>
            {flowSteps.map((s, i) => {
              const selected = i === active;
              return (
                <motion.button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`flow-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls="flow-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`flow__step${selected ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                  onClick={() => {
                    setPlaying(false);
                    select(i);
                  }}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse' && !playing) select(i);
                  }}
                  initial={motionEnabled ? { opacity: 0, y: 24 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: easeOut }}
                >
                  <span className="flow__node tabular" aria-hidden="true">
                    {s.index}
                  </span>
                  <span className="flow__step-title">{s.title}</span>
                  <span className="flow__step-short">{s.short}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="flow__panel" role="tabpanel" id="flow-panel" aria-labelledby={`flow-tab-${step.id}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.id}
              className="flow__panel-inner"
              initial={motionEnabled ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={motionEnabled ? { opacity: 0, y: -10 } : undefined}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              <span className="flow__big serif tabular" aria-hidden="true">
                {String(step.index).padStart(2, '0')}
              </span>
              <div className="flow__panel-main">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <dl className="flow__io">
                <div>
                  <dt>Reçoit</dt>
                  <dd>{step.input}</dd>
                </div>
                <div>
                  <dt>Produit</dt>
                  <dd>{step.output}</dd>
                </div>
                <div className="flow__io-guard">
                  <dt>Garde-fou</dt>
                  <dd>{step.safeguard}</dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>

          <div className="flow__controls">
            <p className="flow__count tabular" aria-live="polite">
              Étape {step.index} / {flowSteps.length}
            </p>
            <div className="flow__buttons">
              <button
                type="button"
                className="btn btn--small"
                onClick={() => {
                  setPlaying(false);
                  select(active - 1);
                }}
                disabled={active === 0}
                aria-label="Étape précédente"
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                className="btn btn--small"
                onClick={() => {
                  setPlaying(false);
                  select(active + 1);
                }}
                disabled={active === last}
                aria-label="Étape suivante"
              >
                <ArrowRight />
              </button>
              <button type="button" className="btn btn--small" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
                {playing ? <Pause /> : <Play />}
                {playing ? 'Pause' : 'Lecture'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
