import { animate as animateValue, stagger, useAnimate, type AnimationPlaybackControls } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { hero, hypothesis } from '../../content/site';
import { useMotionEnabled } from '../../hooks/useMotionPreference';
import { easeCine, easeOut } from '../ui/animation';
import { ArrowDown } from '../ui/Icons';
import { ScrollCue } from '../ui/ScrollCue';
import { CenturionCard } from './CenturionCard';
import './Hero.css';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Ouverture cinématographique : la carte apparaît au centre, glisse vers sa place,
 * puis le titre et l'indicateur se révèlent. Toute interaction (scroll, touche, clic)
 * termine immédiatement la séquence ; elle est désactivée en mouvement réduit.
 */
export function Hero() {
  const motionEnabled = useMotionEnabled();
  const [scope, animate] = useAnimate<HTMLElement>();
  const cardRef = useRef<HTMLDivElement>(null);
  const kpiRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const section = scope.current;
    const card = cardRef.current;
    if (!motionEnabled || !section || !card || window.scrollY > 40) {
      setDone(true);
      return;
    }

    const reveals = Array.from(section.querySelectorAll<HTMLElement>('[data-reveal]'));
    const controls: AnimationPlaybackControls[] = [];
    let cancelled = false;
    const track = (c: AnimationPlaybackControls) => {
      controls.push(c);
      return c;
    };

    // Position d'arrivée mesurée, puis départ au centre de l'écran.
    card.style.transform = 'none';
    const s = section.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const dx = s.left + s.width / 2 - (c.left + c.width / 2);
    const dy = s.top + window.innerHeight / 2 - (c.top + c.height / 2);

    card.style.opacity = '0';
    card.style.transform = `translate3d(${dx}px, ${dy + 40}px, 0) scale(0.86)`;
    reveals.forEach((el) => (el.style.opacity = '0'));

    const reset = () => {
      card.style.opacity = '';
      card.style.transform = '';
      card.style.filter = '';
      reveals.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
      });
      if (kpiRef.current) kpiRef.current.textContent = `−${hypothesis.reductionPct}`;
    };

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      controls.forEach((ctl) => ctl.stop());
      reset();
      setDone(true);
      removeSkip();
    };

    const skipEvents = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    const removeSkip = () => skipEvents.forEach((ev) => window.removeEventListener(ev, finish));
    skipEvents.forEach((ev) => window.addEventListener(ev, finish, { passive: true }));

    const run = async () => {
      // 1. Entrée de la carte au centre
      await track(
        animate(
          card,
          { opacity: [0, 1], x: [dx, dx], y: [dy + 40, dy], scale: [0.86, 1], rotateX: [16, 0] },
          { duration: 1.15, ease: easeOut },
        ),
      );
      if (cancelled) return;
      await wait(380);
      if (cancelled) return;

      // 2. Mouvement rapide vers sa position, léger flou de bougé
      track(animate(card, { x: [dx, 0], y: [dy, 0], rotateY: [0, -14, 0] }, { duration: 0.85, ease: easeCine }));
      track(
        animate(card, { filter: ['blur(0px)', 'blur(2.5px)', 'blur(0px)'] }, { duration: 0.85, ease: 'easeInOut' }),
      );
      await wait(520);
      if (cancelled) return;

      // 3. Révélation du titre et de l'indicateur, à l'arrivée de la carte
      track(animate(reveals, { opacity: [0, 1], y: [22, 0] }, { duration: 0.9, delay: stagger(0.09), ease: easeOut }));
      await wait(380);
      if (cancelled) return;
      await track(
        animateValue(0, hypothesis.reductionPct, {
          duration: 1.1,
          ease: easeOut,
          onUpdate: (v) => {
            if (kpiRef.current) kpiRef.current.textContent = `−${Math.round(v)}`;
          },
        }),
      );
      finish();
    };
    void run();

    return () => {
      cancelled = true;
      controls.forEach((ctl) => ctl.stop());
      removeSkip();
      reset();
    };
  }, [animate, scope, motionEnabled]);

  return (
    <section id="intro" ref={scope} className="hero section" data-tone="dark" aria-labelledby="hero-title">
      <div className="hero__guides" aria-hidden="true" />
      <div className="hero__inner container">
        <div className="hero__copy">
          <p className="kicker" data-reveal>
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="hero__title" data-reveal tabIndex={-1}>
            {hero.title}
          </h1>
          <p className="hero__context" data-reveal>
            {hero.context}
          </p>

          <div className="hero__kpi" data-reveal>
            <p className="hero__kpi-value serif" aria-hidden="true">
              <span ref={kpiRef} className="tabular">
                −{hypothesis.reductionPct}
              </span>
              <span className="hero__kpi-unit">%</span>
            </p>
            <div className="hero__kpi-text">
              <p className="hero__kpi-label">
                <span className="sr-only">Moins {hypothesis.reductionPct} % </span>
                {hero.kpiLabel}
              </p>
              <span className="tag tag--hypo tag--dot">{hero.kpiNote}</span>
            </div>
          </div>

          <div className="hero__actions" data-reveal>
            <a className="btn btn--solid" href="#demonstration">
              Voir la démonstration
              <ArrowDown />
            </a>
            <a className="btn" href="#produit">
              Explorer le produit envisagé
            </a>
          </div>
        </div>

        <div className="hero__stage">
          <div ref={cardRef} className="hero__card">
            <CenturionCard interactive={done} />
          </div>
          <p className="hero__caption" data-reveal>
            Visuel illustratif · projet indépendant, non affilié à American Express
          </p>
        </div>
      </div>

      <div className={`hero__cue${done ? ' is-visible' : ''}`}>
        <ScrollCue href="#demonstration" label="Découvrir" />
      </div>
    </section>
  );
}
