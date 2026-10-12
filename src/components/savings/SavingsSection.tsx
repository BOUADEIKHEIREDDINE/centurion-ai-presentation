import { animate, motion, useInView, useMotionValue, type AnimationPlaybackControls } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { disclaimers, hypothesis } from '../../content/site';
import { useMotionEnabled } from '../../hooks/useMotionPreference';
import { easeCine, easeOut } from '../ui/animation';
import { Replay } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { ScrollCue } from '../ui/ScrollCue';
import { SplitHeading } from '../ui/SplitHeading';
import { SavingsRing, type RingStage } from './SavingsRing';
import './Savings.css';

const { manualMinutes, prospectsWithTool, toolMinutes, reductionPct } = hypothesis;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const axis = [0, 30, 60, 90, 120];

export function SavingsSection() {
  const motionEnabled = useMotionEnabled();
  const figureRef = useRef<HTMLDivElement>(null);
  const inView = useInView(figureRef, { once: true, amount: 0.55 });

  const minutes = useMotionValue(motionEnabled ? 0 : toolMinutes);
  const reference = useMotionValue(motionEnabled ? 0 : 1);
  const [stage, setStage] = useState<RingStage>(motionEnabled ? 'idle' : 'final');
  const runId = useRef(0);
  const controls = useRef<AnimationPlaybackControls[]>([]);

  const play = useCallback(async () => {
    const id = ++runId.current;
    controls.current.forEach((c) => c.stop());
    const alive = () => id === runId.current;

    minutes.set(0);
    reference.set(0);
    setStage('reference');

    // 1. Le cercle se dessine pendant que le compteur atteint 120.
    controls.current = [
      animate(minutes, manualMinutes, { duration: 1.7, ease: easeOut }),
      animate(reference, 1, { duration: 1.7, ease: easeOut }),
    ];
    await controls.current[0];
    if (!alive()) return;
    await wait(900);
    if (!alive()) return;

    // 2. L'arc se réduit à 20 % et le compteur descend à 24, avec la même valeur.
    setStage('reducing');
    const reduce = animate(minutes, toolMinutes, { duration: 1.9, ease: easeCine });
    controls.current = [reduce];
    await reduce;
    if (!alive()) return;
    setStage('final');
  }, [minutes, reference]);

  useEffect(() => {
    if (inView && motionEnabled && stage === 'idle') void play();
  }, [inView, motionEnabled, play, stage]);

  useEffect(
    () => () => {
      runId.current++;
      controls.current.forEach((c) => c.stop());
    },
    [],
  );

  const showSplit = stage === 'final';

  return (
    <section id="demonstration" className="section savings" data-tone="dark" aria-labelledby="savings-title">
      <div className="container">
        <div className="savings__grid">
          <div ref={figureRef} className="savings__figure">
            <SavingsRing minutes={minutes} reference={reference} stage={stage} />
            {motionEnabled && (
              <button
                type="button"
                className="btn btn--small savings__replay"
                onClick={() => void play()}
                disabled={stage === 'reference' || stage === 'reducing'}
              >
                <Replay /> Rejouer l’animation
              </button>
            )}
          </div>

          <div className="savings__copy">
            <Reveal>
              <p className="kicker">La démonstration chiffrée</p>
            </Reveal>
            <SplitHeading
              id="savings-title"
              className="savings__title"
              text={'Et si cinq prospects pouvaient être préqualifiés dans le temps d’un seul ?'}
              emphasis={['cinq', 'seul ?']}
            />

            <Reveal delay={0.1}>
              <dl className="legend">
                <div className="legend__row">
                  <dt>
                    <span className="legend__swatch legend__swatch--ref" aria-hidden="true" />
                    Référence manuelle
                  </dt>
                  <dd className="tabular">{manualMinutes} minutes</dd>
                </div>
                <div className="legend__row">
                  <dt>
                    <span className="legend__swatch legend__swatch--ai" aria-hidden="true" />
                    Scénario assisté par IA
                  </dt>
                  <dd className="tabular">{toolMinutes} minutes par prospect</dd>
                </div>
                <div className="legend__row legend__row--total">
                  <dt>Réduction théorique du temps moyen</dt>
                  <dd className="serif tabular">{reductionPct} %</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="savings__calc">
                <p>
                  <span className="tabular">
                    {manualMinutes} min ÷ {prospectsWithTool} prospects = {toolMinutes} min
                  </span>
                  <span className="savings__calc-sep" aria-hidden="true">
                    ·
                  </span>
                  <span className="tabular">
                    (1 − {toolMinutes} / {manualMinutes}) × 100 = {reductionPct} %
                  </span>
                </p>
                <p className="savings__calc-note">
                  Hypothèse de calcul : {prospectsWithTool} prospects identifiés et préqualifiés en deux heures par le
                  système, contre un seul en deux heures dans le scénario manuel. Le temps avec l’outil inclut la
                  vérification par l’analyste.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="notice" role="note">
                <span>
                  <strong>À noter.</strong> {disclaimers.hypothesis}
                </span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Même fenêtre de deux heures, découpée par prospect */}
        <div className="timeline" aria-label="Comparaison sur une fenêtre de deux heures">
          <div className="timeline__row">
            <p className="timeline__name">
              Manuel <span>1 prospect</span>
            </p>
            <div className="timeline__track">
              <motion.div
                className="timeline__block timeline__block--ref"
                initial={motionEnabled ? { scaleX: 0 } : false}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1.2, ease: easeOut }}
              >
                <span>Prospect 1 · {manualMinutes} min</span>
              </motion.div>
            </div>
          </div>
          <div className="timeline__row">
            <p className="timeline__name">
              Assisté <span>{prospectsWithTool} prospects · hypothèse</span>
            </p>
            <div className="timeline__track timeline__track--split">
              {Array.from({ length: prospectsWithTool }, (_, i) => (
                <motion.div
                  key={i}
                  className="timeline__block timeline__block--ai"
                  initial={motionEnabled ? { scaleX: 0, opacity: 0 } : false}
                  animate={showSplit || !motionEnabled ? { scaleX: 1, opacity: 1 } : undefined}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.14, ease: easeOut }}
                >
                  <span>
                    P{i + 1}
                    <span className="timeline__min"> · {toolMinutes} min</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="timeline__axis" aria-hidden="true">
            {axis.map((t) => (
              <span key={t} style={{ left: `${(t / manualMinutes) * 100}%` }}>
                {t} min
              </span>
            ))}
          </div>
          <p className="timeline__caption">
            Même durée de travail, capacité ×{prospectsWithTool} — si l’hypothèse se vérifie.
          </p>
        </div>

        <div className="savings__cue">
          <ScrollCue href="#besoin" label="Comprendre le besoin" />
        </div>
      </div>
    </section>
  );
}
