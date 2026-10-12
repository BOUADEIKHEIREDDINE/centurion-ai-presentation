import { need } from '../../content/site';
import { Reveal } from '../ui/Reveal';
import { SplitHeading } from '../ui/SplitHeading';
import './Need.css';

export function NeedSection() {
  return (
    <section id="besoin" className="section need" data-tone="light" aria-labelledby="need-title">
      <div className="container">
        <div className="need__head">
          <Reveal>
            <p className="kicker">{need.kicker}</p>
          </Reveal>
          <SplitHeading id="need-title" className="need__title" text={need.title} emphasis={['structuré.']} />
          <Reveal delay={0.15} className="need__lead">
            <p>{need.lead}</p>
          </Reveal>
        </div>

        <div className="need__body">
          <Reveal className="need__assumption">
            <h3>{need.assumptionTitle}</h3>
            <span className="tag tag--hypo tag--dot">Hypothèse à confirmer</span>
            <p>{need.assumptionNote}</p>
          </Reveal>

          <ol className="need__pains">
            {need.pains.map((pain, i) => (
              <Reveal as="li" key={pain.title} delay={i * 0.1} className="need__pain">
                <span className="need__index serif tabular" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="need__charter">
          <h3 className="need__charter-title">Les principes du projet</h3>
          <ul>
            {need.principles.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
