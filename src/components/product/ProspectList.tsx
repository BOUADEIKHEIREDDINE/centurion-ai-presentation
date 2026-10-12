import type { ScoredProspect } from '../../data/scoring';
import { confidenceLabel, decisionLabel, priorityLabel, type Decision } from './labels';

interface ProspectListProps {
  items: ScoredProspect[];
  selectedId: string | null;
  decisions: Record<string, Decision>;
  onSelect: (id: string) => void;
}

export function ProspectList({ items, selectedId, decisions, onSelect }: ProspectListProps) {
  return (
    <ul className="plist" aria-label="Prospects fictifs, triés par priorité de revue">
      {items.map((p) => {
        const conf = confidenceLabel[p.confidence];
        const decision = decisions[p.id];
        const selected = p.id === selectedId;
        return (
          <li key={p.id}>
            <button
              type="button"
              className={`plist__row${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => onSelect(p.id)}
            >
              <span className="plist__main">
                <span className="plist__code">{p.code}</span>
                <span className="plist__role">
                  {p.role} · {p.sector}
                </span>
              </span>
              <span className="plist__country" title={p.country}>
                {p.countryCode}
              </span>
              <span className="plist__sources tabular" title="Sources consultées">
                {p.sources.length}
                <span className="sr-only"> sources</span>
              </span>
              <span className={`tag tag--${conf.tone} plist__conf`}>
                <span className="sr-only">Confiance </span>
                {conf.label}
              </span>
              <span className={`plist__prio plist__prio--${p.priority}`}>
                <span className="plist__prio-bars" aria-hidden="true">
                  {[1, 2, 3].map((n) => (
                    <i key={n} className={n <= priorityLabel[p.priority].rank ? 'on' : undefined} />
                  ))}
                </span>
                <span className="sr-only">Priorité </span>
                {priorityLabel[p.priority].label}
              </span>
              {decision && <span className={`plist__decision plist__decision--${decision}`}>{decisionLabel[decision]}</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
