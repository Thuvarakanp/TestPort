import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { gallery, galleryCategories } from '../gallery.js';

function Tile({ item, onOpen }) {
  return (
    <button type="button" className="gl-tile" style={{ aspectRatio: item.ratio }} onClick={onOpen} aria-label={`Open ${item.title}`}>
      {item.src ? (
        <img src={item.src} alt={item.title} loading="lazy" />
      ) : (
        <span className="gl-ph" style={{ background: item.color, color: item.ink }}>
          <span className="gl-ph-title">{item.title}</span>
          <span className="gl-ph-note">Design coming soon</span>
        </span>
      )}
      <span className="gl-cap"><b>{item.title}</b><i>{item.category} · {item.year}</i></span>
    </button>
  );
}

export default function Gallery() {
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null);
  const dlg = useRef(null);
  const shown = gallery.filter((g) => cat === 'All' || g.category === cat);
  const cur = open === null ? null : shown[open];

  useEffect(() => {
    const d = dlg.current;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const step = (dir) => setOpen((i) => (i + dir + shown.length) % shown.length);
  const onKey = (e) => {
    if (open === null) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  return (
    <section className="gallery gl" id="gallery" aria-labelledby="gallery-title">
      <Reveal className="section-heading">
        <div><span className="eyebrow">GALLERY / SELECTED DESIGNS</span><h2 id="gallery-title">Things I’ve <em>made.</em></h2></div>
        <p>Interfaces, graphics and concepts from across the six chapters.</p>
      </Reveal>

      <div className="gl-filters" role="group" aria-label="Filter designs">
        {galleryCategories.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>
            {c}<sup>{c === 'All' ? gallery.length : gallery.filter((g) => g.category === c).length}</sup>
          </button>
        ))}
      </div>

      <div className="gl-grid" key={cat}>
        {shown.map((item, i) => <Tile key={item.id} item={item} onOpen={() => setOpen(i)} />)}
      </div>

      <dialog className="dialog gl-dialog" ref={dlg} onClose={() => setOpen(null)} onKeyDown={onKey}
        onClick={(e) => { if (e.target === dlg.current) setOpen(null); }}>
        <button className="dialog-close" onClick={() => setOpen(null)} aria-label="Close gallery">×</button>
        {cur && (
          <div className="gl-view">
            <div className="gl-stage">
              {cur.src ? <img src={cur.src} alt={cur.title} /> : (
                <span className="gl-ph gl-ph-big" style={{ background: cur.color, color: cur.ink, aspectRatio: cur.ratio }}>
                  <span className="gl-ph-title">{cur.title}</span><span className="gl-ph-note">Design coming soon</span>
                </span>
              )}
            </div>
            <div className="gl-info">
              <span className="eyebrow">{cur.category} · {cur.year}</span>
              <h3>{cur.title}</h3>
              <p className="gl-project">{cur.project}</p>
              <p>{cur.blurb}</p>
              <div className="gl-nav">
                <span>{String(open + 1).padStart(2, '0')} / {String(shown.length).padStart(2, '0')}</span>
                <span><button type="button" onClick={() => step(-1)} aria-label="Previous design">←</button><button type="button" onClick={() => step(1)} aria-label="Next design">→</button></span>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
