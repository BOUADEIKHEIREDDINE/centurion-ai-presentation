import { MotionConfig } from 'motion/react';
import { ArchitectureSection } from './components/architecture/ArchitectureSection';
import { ConclusionSection } from './components/conclusion/ConclusionSection';
import { FlowSection } from './components/flow/FlowSection';
import { Hero } from './components/hero/Hero';
import { Header } from './components/layout/Header';
import { NeedSection } from './components/need/NeedSection';
import { ProductSection } from './components/product/ProductSection';
import { SavingsSection } from './components/savings/SavingsSection';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ValidationSection } from './components/validation/ValidationSection';

const sections = [
  { name: 'Introduction', Component: Hero },
  { name: 'Démonstration chiffrée', Component: SavingsSection },
  { name: 'Besoin métier', Component: NeedSection },
  { name: 'Fonctionnement', Component: FlowSection },
  { name: 'Produit envisagé', Component: ProductSection },
  { name: 'Architecture', Component: ArchitectureSection },
  { name: 'Validation', Component: ValidationSection },
  { name: 'Conclusion', Component: ConclusionSection },
];

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#demonstration">
        Aller au contenu
      </a>
      <Header />
      <main>
        {sections.map(({ name, Component }) => (
          <ErrorBoundary key={name} name={name}>
            <Component />
          </ErrorBoundary>
        ))}
      </main>
    </MotionConfig>
  );
}
