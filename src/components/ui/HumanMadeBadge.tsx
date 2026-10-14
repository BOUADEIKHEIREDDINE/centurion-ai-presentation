import { disclaimers } from '../../content/site';
import './HumanMadeBadge.css';

export function HumanMadeBadge() {
  return (
    <aside className="human-badge" aria-label="Note de l’auteur">
      <span className="human-badge__dot" aria-hidden="true" />
      {disclaimers.humanMade}
    </aside>
  );
}
