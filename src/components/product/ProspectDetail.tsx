import { AnimatePresence, motion } from 'motion/react';
import { Fragment, useEffect, useState, type KeyboardEvent } from 'react';
import { criterionContribution, type ScoredProspect } from '../../data/scoring';
import { useMotionEnabled } from '../../hooks/useMotionPreference';
import { easeOut } from '../ui/animation';
import { Check, Cross, Doc, Question } from '../ui/Icons';
import {
  confidenceLabel,
  decisionLabel,
  detailTabs,
  factLabel,
  priorityLabel,
  type Decision,
  type DetailTab,
} from './labels';

interface ProspectDetailProps {
  prospect: ScoredProspect;
  decision: Decision | undefined;
  onDecide: (decision: Decision | null) => void;
}

/** Découpe la synthèse et transforme chaque « [s1] » en renvoi cliquable vers la source. */
function Summary({ text, onCite }: { text: string; onCite: (id: string) => void }) {
  const parts = text.split(/\[(s\d+)\]/g);
  return (
    <p className="pdetail__summary">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <button key={i} type="button" className="cite" onClick={() => onCite(part)} aria-label={`Voir la source ${part.slice(1)}`}>
            {part.slice(1)}
          </button>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </p>
  );
}

export function ProspectDetail({ prospect, decision, onDecide }: ProspectDetailProps) {
  const motionEnabled = useMotionEnabled();
  const [tab, setTab] = useState<DetailTab>('synthese');
  const [openSource, setOpenSource] = useState<string | null>(null);

  useEffect(() => {
    setTab('synthese');
    setOpenSource(null);
  }, [prospect.id]);

  const cite = (id: string) => {
    setOpenSource(id);
    setTab('sources');
  };

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = detailTabs.findIndex((t) => t.id === tab);
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = detailTabs[(idx + delta + detailTabs.length) % detailTabs.length]!;
    setTab(next.id);
    document.getElementById(`ptab-${next.id}`)?.focus();
  };

  const conf = confidenceLabel[prospect.confidence];
  const counts = prospect.facts.reduce(
    (acc, f) => ({ ...acc, [f.status]: acc[f.status] + 1 }),
    { verifie: 0, estime: 0, manquant: 0 },
  );

  return (
    <article className="pdetail" aria-labelledby="pdetail-title">
      <header className="pdetail__head">
        <div>
          <p className="pdetail__eyebrow">Fiche prospect · profil fictif</p>
          <h3 id="pdetail-title" className="pdetail__title">
            {prospect.code}
          </h3>
          <p className="pdetail__meta">
            {prospect.role} · {prospect.sector} · {prospect.country}
          </p>
        </div>
        <div className="pdetail__score" aria-label={`Score de priorité ${prospect.score} sur 100`}>
          <span className="pdetail__score-label">Priorité de revue</span>
          <span className="pdetail__score-value tabular">
            {prospect.score}
            <small>/100</small>
          </span>
          <span className="pdetail__score-bar" aria-hidden="true">
            <motion.span
              key={prospect.id}
              initial={motionEnabled ? { scaleX: 0 } : false}
              animate={{ scaleX: prospect.score / 100 }}
              transition={{ duration: 0.8, ease: easeOut }}
            />
          </span>
          <span className="pdetail__score-prio">{priorityLabel[prospect.priority].label}</span>
        </div>
      </header>

      <div className="pdetail__chips">
        <span className={`tag tag--${conf.tone} tag--dot`}>Confiance {conf.label.toLowerCase()}</span>
        <span className="tag tag--ok">{counts.verifie} vérifié{counts.verifie > 1 ? 's' : ''}</span>
        <span className="tag tag--hypo">{counts.estime} estimé{counts.estime > 1 ? 's' : ''}</span>
        <span className="tag tag--risk">{counts.manquant} manquant{counts.manquant > 1 ? 's' : ''}</span>
        <span className="tag">{prospect.sources.length} sources</span>
      </div>

      <div className="pdetail__tabs" role="tablist" aria-label="Sections de la fiche" onKeyDown={onTabKey}>
        {detailTabs.map((t) => (
          <button
            key={t.id}
            id={`ptab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls="ppanel"
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="pdetail__panel" role="tabpanel" id="ppanel" aria-labelledby={`ptab-${tab}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${prospect.id}-${tab}`}
            initial={motionEnabled ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={motionEnabled ? { opacity: 0 } : undefined}
            transition={{ duration: 0.25 }}
          >
            {tab === 'synthese' && (
              <div className="pdetail__stack">
                <div className="ai-label">
                  <span className="ai-label__dot" aria-hidden="true" />
                  Synthèse générée par l’IA · à relire par l’analyste
                </div>
                <Summary text={prospect.summary} onCite={cite} />
                <div className="pdetail__uncertain">
                  <h4>Points d’attention</h4>
                  <ul>
                    {prospect.uncertainties.map((u) => (
                      <li key={u}>
                        <Question /> {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tab === 'faits' && (
              <table className="ptable">
                <caption className="sr-only">Faits documentés et statut de vérification</caption>
                <thead>
                  <tr>
                    <th scope="col">Information</th>
                    <th scope="col">Valeur</th>
                    <th scope="col">Statut</th>
                    <th scope="col">Sources</th>
                  </tr>
                </thead>
                <tbody>
                  {prospect.facts.map((f) => {
                    const st = factLabel[f.status];
                    return (
                      <tr key={f.label}>
                        <th scope="row">{f.label}</th>
                        <td>{f.value}</td>
                        <td>
                          <span className={`tag tag--${st.tone} tag--dot`}>{st.label}</span>
                        </td>
                        <td>
                          {f.sourceIds.length === 0
                            ? '—'
                            : f.sourceIds.map((id) => (
                                <button key={id} type="button" className="cite" onClick={() => cite(id)} aria-label={`Voir la source ${id.slice(1)}`}>
                                  {id.slice(1)}
                                </button>
                              ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {tab === 'finances' && (
              <div className="pdetail__stack">
                <div>
                  <h4 className="pdetail__h4">Entreprises associées</h4>
                  <ul className="pcompanies">
                    {prospect.companies.map((c) => (
                      <li key={c.name}>
                        <strong>{c.name}</strong>
                        <span>
                          {c.role} · {c.sector} · depuis {c.since}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="pdetail__h4">Informations financières publiques</h4>
                  <dl className="pfin">
                    {prospect.financials.map((f) => (
                      <div key={f.label} className={f.value ? undefined : 'is-missing'}>
                        <dt>{f.label}</dt>
                        <dd className="tabular">{f.value ?? 'Non publié'}</dd>
                        <dd className="pfin__src">
                          {f.sourceId ? (
                            <button type="button" className="cite" onClick={() => cite(f.sourceId!)}>
                              {f.year} · source {f.sourceId.slice(1)}
                            </button>
                          ) : (
                            'Aucune source'
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="pdetail__fine">
                    Seules les données publiées par les entreprises sont affichées. Aucune estimation de patrimoine
                    personnel n’est produite ; l’outil ne se prononce pas sur l’éligibilité à la carte.
                  </p>
                </div>
              </div>
            )}

            {tab === 'sources' && (
              <ol className="psources">
                {prospect.sources.map((s) => {
                  const open = openSource === s.id;
                  return (
                    <li key={s.id} className={open ? 'is-open' : undefined}>
                      <button
                        type="button"
                        className="psources__head"
                        aria-expanded={open}
                        onClick={() => setOpenSource(open ? null : s.id)}
                      >
                        <span className="psources__num tabular">{s.id.slice(1)}</span>
                        <Doc />
                        <span className="psources__title">
                          {s.title}
                          <small>
                            {s.type} · {s.date} · source {s.reliability.toLowerCase()}
                          </small>
                        </span>
                      </button>
                      {open && (
                        <blockquote className="psources__excerpt">
                          {s.excerpt}
                          <footer>Extrait fictif, rédigé pour la démonstration.</footer>
                        </blockquote>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}

            {tab === 'criteres' && (
              <div className="pdetail__stack">
                <ul className="pcriteria">
                  {prospect.criteria.map((c) => {
                    const contribution = criterionContribution(c);
                    return (
                      <li key={c.label}>
                        <span className={`pcriteria__icon pcriteria__icon--${String(c.met)}`} aria-hidden="true">
                          {c.met === true ? <Check /> : c.met === false ? <Cross /> : <Question />}
                        </span>
                        <div className="pcriteria__body">
                          <p className="pcriteria__label">
                            {c.label}
                            <span className="sr-only">
                              {c.met === true ? ' : rempli' : c.met === false ? ' : non rempli' : ' : incertain'}
                            </span>
                          </p>
                          <p className="pcriteria__why">{c.explanation}</p>
                          <span className="pcriteria__bar" aria-hidden="true">
                            <span style={{ width: `${c.weight * 100}%` }} className="pcriteria__weight" />
                            <span style={{ width: `${contribution * 100}%` }} className="pcriteria__contrib" />
                          </span>
                        </div>
                        <span className="pcriteria__pts tabular">
                          +{Math.round(contribution * 100)}
                          <small> / {Math.round(c.weight * 100)}</small>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="pdetail__fine">
                  Score = somme des contributions : critère rempli = poids complet, incertain = moitié, non rempli = 0.
                  Le score ordonne la file de revue ; il ne constitue pas une décision.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="pdetail__decide">
        <p className="pdetail__decide-label">
          Décision humaine
          {decision && (
            <span className="pdetail__decided" role="status">
              {' '}
              · {decisionLabel[decision]}
            </span>
          )}
        </p>
        <div className="pdetail__decide-actions">
          {(Object.keys(decisionLabel) as Decision[]).map((d) => (
            <button
              key={d}
              type="button"
              className={`pbtn pbtn--${d}`}
              aria-pressed={decision === d}
              onClick={() => onDecide(decision === d ? null : d)}
            >
              {d === 'retenu' ? 'Retenir' : d === 'verification' ? 'Demander une vérification' : 'Écarter'}
            </button>
          ))}
        </div>
      </footer>
    </article>
  );
}
