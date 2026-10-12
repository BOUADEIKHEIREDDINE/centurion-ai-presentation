import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { navItems } from '../../content/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import type { SectionId } from '../../types';
import { Cross, Menu } from '../ui/Icons';
import './Header.css';

const observedIds: SectionId[] = ['intro', ...navItems.map((n) => n.id)];

export function Header() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const active = useActiveSection(observedIds);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="header" data-tone="dark">
      <motion.div className="header__progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="header__inner">
        <a className="header__brand" href="#intro" aria-label="Retour au début de la présentation">
          <span className="header__mark" aria-hidden="true" />
          <span>
            Prospection IA <span className="header__brand-sub">· proposition d’alternance</span>
          </span>
        </a>

        <nav className={`header__nav${open ? ' is-open' : ''}`} id="site-nav" aria-label="Sections">
          <ol>
            {navItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="header__num tabular" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <button
          className="header__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Cross /> : <Menu />}
          <span className="sr-only">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
        </button>
      </div>
    </header>
  );
}
