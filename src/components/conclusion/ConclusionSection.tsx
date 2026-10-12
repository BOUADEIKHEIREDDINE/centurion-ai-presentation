import { contact } from '../../config/contact';
import { conclusion, disclaimers } from '../../content/site';
import { ArrowUp, Mail } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SplitHeading } from '../ui/SplitHeading';
import './Conclusion.css';

interface ContactLink {
  label: string;
  value: string;
  href: string;
}

function contactLinks(): ContactLink[] {
  const links: (ContactLink | null)[] = [
    contact.email ? { label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` } : null,
    contact.phone ? { label: 'Téléphone', value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, '')}` } : null,
    contact.linkedin ? { label: 'LinkedIn', value: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: contact.linkedin } : null,
    contact.github ? { label: 'GitHub', value: contact.github.replace(/^https?:\/\/(www\.)?/, ''), href: contact.github } : null,
    contact.portfolio ? { label: 'Portfolio', value: contact.portfolio.replace(/^https?:\/\//, ''), href: contact.portfolio } : null,
  ];
  return links.filter((l): l is ContactLink => l !== null);
}

export function ConclusionSection() {
  const links = contactLinks();

  const backToTop = () => {
    window.scrollTo({ top: 0 });
    document.getElementById('hero-title')?.focus({ preventScroll: true });
  };

  return (
    <section id="conclusion" className="section conclusion" data-tone="dark" aria-labelledby="conclusion-title">
      <div className="container">
        <Reveal>
          <p className="kicker">F · Conclusion</p>
        </Reveal>
        <SplitHeading
          id="conclusion-title"
          className="conclusion__title"
          text={conclusion.title}
          emphasis={['rechercher,', 'documenter', 'décider.']}
        />

        <div className="conclusion__grid">
          <Reveal className="conclusion__text">
            <p>{conclusion.text}</p>
            <p className="conclusion__open">{conclusion.openness}</p>
          </Reveal>

          <Reveal delay={0.1} className="conclusion__contact">
            <h3>Me contacter</h3>
            <p className="conclusion__name">{contact.name}</p>
            <p className="conclusion__headline">{contact.headline}</p>
            {links.length > 0 ? (
              <ul className="conclusion__links">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      <span className="conclusion__link-label">{l.label}</span>
                      <span className="conclusion__link-value">{l.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="conclusion__empty">Coordonnées à renseigner dans src/config/contact.ts.</p>
            )}
            {contact.email && (
              <a className="btn btn--solid conclusion__cta" href={`mailto:${contact.email}`}>
                <Mail /> Échanger sur ce projet
              </a>
            )}
          </Reveal>
        </div>

        <div className="conclusion__end">
          <button type="button" className="btn" onClick={backToTop}>
            <ArrowUp /> Revenir au début
          </button>
        </div>
      </div>

      <footer className="site-footer">
        <div className="container">
          <p>{disclaimers.independent}</p>
          <p>{disclaimers.fictional}. Aucun chiffre présenté ne constitue un résultat mesuré.</p>
        </div>
      </footer>
    </section>
  );
}
