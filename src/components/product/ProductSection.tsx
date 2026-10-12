import { disclaimers } from '../../content/site';
import { Reveal } from '../ui/Reveal';
import { SplitHeading } from '../ui/SplitHeading';
import { ProspectWorkspace } from './ProspectWorkspace';
import './Product.css';

export function ProductSection() {
  return (
    <section id="produit" className="section product" data-tone="light" aria-labelledby="product-title">
      <div className="container">
        <header className="section-head product__head">
          <Reveal>
            <p className="kicker">C · Le produit envisagé</p>
          </Reveal>
          <SplitHeading
            id="product-title"
            text="Une file de revue où chaque information montre d’où elle vient."
            emphasis={['d’où', 'elle', 'vient.']}
          />
          <Reveal delay={0.1}>
            <p>
              Recherchez, filtrez, ouvrez une fiche, suivez une citation jusqu’à sa source, examinez les critères puis
              enregistrez une décision. Tout fonctionne — mais uniquement sur des données fictives, dans votre
              navigateur.
            </p>
          </Reveal>
        </header>

        <Reveal y={48}>
          <ProspectWorkspace />
        </Reveal>

        <p className="product__disclaimer">
          {disclaimers.fictional}. Les décisions enregistrées restent dans cette page et disparaissent au rechargement.
        </p>
      </div>
    </section>
  );
}
