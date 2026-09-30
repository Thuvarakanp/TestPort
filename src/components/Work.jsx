import Reveal from './Reveal.jsx';
import { fallbackWork } from '../data.js';
import { useCms, WORK_QUERY, mapWork } from '../cms.js';

export function useWork() {
  return useCms(WORK_QUERY, mapWork, fallbackWork);
}

export default function Work({ items, onOpen }) {
  return (
    <section className="stock" id="work">
      <Reveal className="section-heading">
        <div><span className="eyebrow">03 / ON THE SHELVES</span><h2>Design. Build. Test.</h2></div>
        <p>Work across product interfaces, visual communication and this portfolio’s own story.</p>
      </Reveal>
      <p className="sample-disclosure">A selection of responsibilities and contributions from my work experience.</p>
      <div className="shelf-grid">
        {items.map((c) => (
          <Reveal as="button" className="project-card stock-card" key={c.id} onClick={() => onOpen(c)}>
            <div className="image-wrap">
              {c.image ? (
                <img src={c.image} alt={c.imageAlt} loading="lazy" />
              ) : c.imageNight ? (
                <>
                  <img className="night-gallery" src={c.imageNight} alt="The shop at night" loading="lazy" />
                  <img className="day-gallery" src={c.imageDay} alt="Thuvarakan welcoming visitors to the shop in daylight" loading="lazy" />
                </>
              ) : (
                <div className={`qa-cover ${c.cover}`}>
                  <span className="eyebrow">{c.eyebrow}</span>
                  <strong>{c.lines[0]}<br />{c.lines[1]}</strong>
                  <div className="cover-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              )}
            </div>
            <div className="meta"><span>{c.company}</span><span>{c.kind}</span></div>
            <h3>{c.title}</h3>
            <span className="shelf-action">{c.actionLabel || 'Explore the work'}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
