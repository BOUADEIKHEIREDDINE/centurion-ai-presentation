import { motion } from 'motion/react';
import { useId, useState } from 'react';
import { hypothesis } from '../../content/site';
import { protocolSteps, validationMetrics } from '../../data/metrics';
import { useMotionEnabled } from '../../hooks/useMotionPreference';
import { easeOut } from '../ui/animation';
import { Reveal } from '../ui/Reveal';
import { SplitHeading } from '../ui/SplitHeading';
import './Validation.css';

const fmt = (n: number, digits = 1) =>
  n.toLocaleString('fr-FR', { maximumFractionDigits: digits, minimumFractionDigits: 0 });

/** Paires référence / scénario assisté, uniquement pour les indicateurs chiffrés en hypothèse. */
function ComparisonBars() {
  const motionEnabled = useMotionEnabled();
  const quantified = validationMetrics.filter((m) => m.baseline !== undefined && m.target !== undefined);

  return (
    <div className="vcompare">
      {quantified.map((m) => {
        const max = Math.max(m.baseline!, m.target!);
        const rows = [
          { key: 'ref', label: 'Processus de référence', value: m.baseline! },
          { key: 'ai', label: 'Processus assisté (hypothèse)', value: m.target! },
        ];
        return (
          <figure key={m.id} className="vcompare__group">
            <figcaption>
              {m.label}
              <span className="tag tag--hypo">Hypothèse</span>
            </figcaption>
            {rows.map((r, i) => (
              <div key={r.key} className={`vcompare__row vcompare__row--${r.key}`}>
                <span className="vcompare__label">{r.label}</span>
                <span className="vcompare__track">
                  <motion.span
                    className="vcompare__bar"
                    style={{ width: `${(r.value / max) * 100}%` }}
                    initial={motionEnabled ? { scaleX: 0 } : false}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1, delay: i * 0.25, ease: easeOut }}
                  />
                </span>
                <span className="vcompare__value tabular">
                  {fmt(r.value)} {m.unit}
                </span>
              </div>
            ))}
          </figure>
        );
      })}
    </div>
  );
}

/** Simulateur : montre comment le gain dépend du nombre de prospects traités en deux heures. */
function HypothesisSimulator() {
  const id = useId();
  const [count, setCount] = useState<number>(hypothesis.prospectsWithTool);
  const minutes = hypothesis.manualMinutes / count;
  const reduction = (1 - 1 / count) * 100;
  const perHour = count / (hypothesis.manualMinutes / 60);

  return (
    <div className="vsim">
      <div className="vsim__head">
        <h3>Simulateur d’hypothèses</h3>
        <p>
          Faites varier le nombre de prospects que l’outil permettrait de préqualifier en deux heures. Les résultats
          sont calculés, pas mesurés.
        </p>
      </div>
      <label className="vsim__control" htmlFor={id}>
        <span>
          Prospects préqualifiés en 2 h avec l’outil : <strong className="tabular">{count}</strong>
        </span>
        <input
          id={id}
          type="range"
          min={1}
          max={8}
          step={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          aria-valuetext={`${count} prospects`}
        />
        <span className="vsim__scale" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </span>
      </label>
      <dl className="vsim__out" aria-live="polite">
        <div>
          <dt>Temps moyen par prospect</dt>
          <dd className="serif tabular">
            {fmt(minutes)}
            <small> min</small>
          </dd>
        </div>
        <div>
          <dt>Réduction du temps moyen</dt>
          <dd className="serif tabular">
            {fmt(reduction, 0)}
            <small> %</small>
          </dd>
        </div>
        <div>
          <dt>Prospects par heure</dt>
          <dd className="serif tabular">
            {fmt(perHour, 2)}
            <small> / h</small>
          </dd>
        </div>
      </dl>
      <p className="vsim__formula tabular">
        {hypothesis.manualMinutes} ÷ {count} = {fmt(minutes)} min · (1 − 1/{count}) × 100 = {fmt(reduction, 0)} %
      </p>
    </div>
  );
}

export function ValidationSection() {
  return (
    <section id="validation" className="section validation" data-tone="light" aria-labelledby="validation-title">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <p className="kicker">E · La validation</p>
          </Reveal>
          <SplitHeading
            id="validation-title"
            text="Mesurer avant d’affirmer : un protocole simple et comparable."
            emphasis={['Mesurer']}
          />
          <Reveal delay={0.1}>
            <p>
              Un même échantillon de prospects est traité deux fois : selon le processus de référence, puis avec le
              prototype. Les objectifs chiffrés restent des hypothèses tant qu’ils n’ont pas été mesurés.
            </p>
          </Reveal>
        </header>

        <ol className="vprotocol">
          {protocolSteps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1}>
              <span className="vprotocol__num tabular">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="validation__grid">
          <Reveal>
            <ComparisonBars />
          </Reveal>
          <Reveal delay={0.1}>
            <HypothesisSimulator />
          </Reveal>
        </div>

        <Reveal>
          <div className="vtable-wrap">
            <table className="vtable">
              <caption>Indicateurs d’évaluation du prototype</caption>
              <thead>
                <tr>
                  <th scope="col">Indicateur</th>
                  <th scope="col">Hypothèse (référence → outil)</th>
                  <th scope="col">Méthode de mesure</th>
                </tr>
              </thead>
              <tbody>
                {validationMetrics.map((m) => (
                  <tr key={m.id}>
                    <th scope="row">{m.label}</th>
                    <td>
                      <span className={`tag ${m.baseline !== undefined ? 'tag--hypo' : ''}`}>{m.hypothesis}</span>
                    </td>
                    <td>{m.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <blockquote className="validation__quote">
            <p className="serif-italic">
              Un gain de temps n’a de valeur que si la qualité reste au moins équivalente.
            </p>
            <footer>Le chiffre de 80 % reste un objectif expérimental tant qu’il n’a pas été mesuré.</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
