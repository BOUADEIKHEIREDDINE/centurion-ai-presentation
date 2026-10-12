import { useMemo, useRef, useState } from 'react';
import { prospects } from '../../data/prospects';
import { scoreProspects } from '../../data/scoring';
import type { Confidence, Priority } from '../../types';
import { Search } from '../ui/Icons';
import { confidenceLabel, priorityLabel, type Decision } from './labels';
import { ProspectDetail } from './ProspectDetail';
import { ProspectList } from './ProspectList';

const scored = scoreProspects(prospects);
const countries = Array.from(new Set(scored.map((p) => p.country))).sort((a, b) => a.localeCompare(b, 'fr'));

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Maquette de l'outil : filtrage, sélection et décisions sont réels, les données sont fictives et locales. */
export function ProspectWorkspace() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('');
  const [confidence, setConfidence] = useState<Confidence | ''>('');
  const [priority, setPriority] = useState<Priority | ''>('');
  const [selectedId, setSelectedId] = useState<string | null>(scored[0]?.id ?? null);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const detailRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return scored.filter((p) => {
      if (country && p.country !== country) return false;
      if (confidence && p.confidence !== confidence) return false;
      if (priority && p.priority !== priority) return false;
      if (!q) return true;
      const haystack = normalize(
        [p.code, p.role, p.sector, p.country, p.countryCode, ...p.companies.map((c) => `${c.name} ${c.sector}`)].join(' '),
      );
      return q.split(/\s+/).every((term) => haystack.includes(term));
    });
  }, [query, country, confidence, priority]);

  const selected = filtered.find((p) => p.id === selectedId) ?? filtered[0] ?? null;
  const hasFilters = Boolean(query || country || confidence || priority);

  const reset = () => {
    setQuery('');
    setCountry('');
    setConfidence('');
    setPriority('');
  };

  const onSelect = (id: string) => {
    setSelectedId(id);
    if (window.matchMedia('(max-width: 960px)').matches) {
      requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  };

  const reviewed = Object.keys(decisions).length;

  return (
    <div className="workspace">
      <div className="workspace__bar">
        <p className="workspace__title">
          Prospects Centurion <span>· file de revue</span>
        </p>
        <span className="workspace__badge">Aperçu du produit envisagé · données fictives</span>
      </div>

      <form className="workspace__toolbar" role="search" onSubmit={(e) => e.preventDefault()}>
        <label className="workspace__search">
          <Search />
          <span className="sr-only">Rechercher un prospect</span>
          <input
            type="search"
            placeholder="Rechercher : secteur, pays, fonction, entreprise…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="workspace__select">
          <span className="sr-only">Filtrer par pays</span>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Tous les pays</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="workspace__select">
          <span className="sr-only">Filtrer par confiance</span>
          <select value={confidence} onChange={(e) => setConfidence(e.target.value as Confidence | '')}>
            <option value="">Toute confiance</option>
            {(Object.keys(confidenceLabel) as Confidence[]).map((c) => (
              <option key={c} value={c}>
                Confiance {confidenceLabel[c].label.toLowerCase()}
              </option>
            ))}
          </select>
        </label>
        <label className="workspace__select">
          <span className="sr-only">Filtrer par priorité</span>
          <select value={priority} onChange={(e) => setPriority(e.target.value as Priority | '')}>
            <option value="">Toute priorité</option>
            {(Object.keys(priorityLabel) as Priority[]).map((p) => (
              <option key={p} value={p}>
                Priorité {priorityLabel[p].label.toLowerCase()}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className="workspace__body">
        <div className="workspace__list">
          <div className="workspace__list-head">
            <p aria-live="polite">
              <strong className="tabular">{filtered.length}</strong> prospect{filtered.length > 1 ? 's' : ''} sur{' '}
              {scored.length}
              {reviewed > 0 && <span> · {reviewed} décision{reviewed > 1 ? 's' : ''}</span>}
            </p>
            {hasFilters && (
              <button type="button" className="linkbtn" onClick={reset}>
                Réinitialiser
              </button>
            )}
          </div>
          <div className="plist__cols" aria-hidden="true">
            <span>Prospect</span>
            <span>Pays</span>
            <span>Src.</span>
            <span>Confiance</span>
            <span>Priorité</span>
          </div>
          {filtered.length > 0 ? (
            <ProspectList items={filtered} selectedId={selected?.id ?? null} decisions={decisions} onSelect={onSelect} />
          ) : (
            <div className="workspace__empty">
              <p>Aucun prospect ne correspond à ces critères.</p>
              <button type="button" className="btn btn--small" onClick={reset}>
                Effacer les filtres
              </button>
            </div>
          )}
          <p className="workspace__sort">Trié par priorité de revue humaine</p>
        </div>

        <div className="workspace__detail" ref={detailRef}>
          {selected ? (
            <ProspectDetail
              prospect={selected}
              decision={decisions[selected.id]}
              onDecide={(d) =>
                setDecisions((prev) => {
                  const next = { ...prev };
                  if (d) next[selected.id] = d;
                  else delete next[selected.id];
                  return next;
                })
              }
            />
          ) : (
            <div className="workspace__empty workspace__empty--detail">
              <p>Sélectionnez un prospect pour afficher sa fiche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
