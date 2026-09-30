import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { careerShelves } from '../data.js';

const TOTAL = careerShelves.length;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export default function CareerShelves() {
  const trackRef = useRef(null);
  const [landed, setLanded] = useState(0);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    const track = trackRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = matchMedia('(max-width: 900px)');
    let pending = false;

    function update() {
      pending = false;
      if (reduced.matches || narrow.matches) return setLanded(TOTAL);
      const distance = track.offsetHeight - innerHeight;
      const p = clamp(-track.getBoundingClientRect().top / Math.max(distance, 1));
      // Crates arrive across the first ~85% of the pin; the rest is a hold.
      const start = p <= 0 ? 0 : Math.min(TOTAL, Math.floor(p / 0.85 * TOTAL) + 1);
      setLanded(start);
    }
    const schedule = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    narrow.addEventListener('change', schedule);
    update();
    return () => {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
      narrow.removeEventListener('change', schedule);
    };
  }, []);

  // A new delivery arriving takes the spotlight back from a manual pick.
  useEffect(() => setPicked(null), [landed]);

  const selectedIdx = landed === 0 ? null : picked !== null && picked < landed ? picked : landed - 1;

  return (
    <section className="career-stock stockroom" id="story" aria-labelledby="story-title">
      <div className="stock-track" ref={trackRef}>
        <div
          className="stock-sticky"
          onKeyDown={(e) => {
            if (selectedIdx === null) return;
            if (e.key === 'ArrowRight' && selectedIdx < landed - 1) setPicked(selectedIdx + 1);
            if (e.key === 'ArrowLeft' && selectedIdx > 0) setPicked(selectedIdx - 1);
          }}
        >
          <div className="stock-side">
            <span className="eyebrow">02 / HOW THE SHELVES FILLED UP</span>
            <h2 id="story-title">Six chapters.<br /><em>One shop.</em></h2>
            <div className="stock-detail" aria-live="polite">
              {/* every role is rendered in the same cell so the panel keeps the height of the tallest one */}
              {careerShelves.map((c, i) => (
                <div key={c.n} className={`stock-detail-inner${selectedIdx === i ? ' is-sel' : ''}`} aria-hidden={selectedIdx !== i}>
                  <div className="detail-head">
                    <span>SHELF {c.n} · {c.period}{c.current && <em className="now-label">CURRENT</em>}</span>
                    <span className="detail-nav">
                      <button type="button" tabIndex={selectedIdx === i ? 0 : -1} onClick={() => setPicked(i - 1)} disabled={i === 0} aria-label="Previous shelf">←</button>
                      <button type="button" tabIndex={selectedIdx === i ? 0 : -1} onClick={() => setPicked(i + 1)} disabled={i >= landed - 1} aria-label="Next shelf">→</button>
                    </span>
                  </div>
                  <h3>{c.role}</h3>
                  <p className="detail-company">{c.company}</p>
                  <p className="detail-title">“{c.title}”</p>
                  <dl>
                    <dt>On the job</dt><dd>{c.job}</dd>
                    <dt>Brought forward</dt><dd>{c.forward}</dd>
                  </dl>
                  <div className="price-tag"><span>ADDED TO THE STORE</span><strong>{c.takeaway}</strong></div>
                </div>
              ))}
              <p className={`detail-empty${selectedIdx === null ? ' is-sel' : ''}`} aria-hidden={selectedIdx !== null}>The shelves are empty. Keep scrolling. A delivery is on its way.</p>
            </div>
          </div>

          <div className="stock-shelf">
            {careerShelves.map((s, i) => {
              const isLanded = i < landed;
              return (
                <button
                  key={s.n}
                  type="button"
                  className={`card${isLanded ? ' landed' : ''}${selectedIdx === i ? ' selected' : ''}`}
                  disabled={!isLanded}
                  tabIndex={isLanded ? 0 : -1}
                  aria-hidden={!isLanded}
                  aria-pressed={selectedIdx === i}
                  aria-label={`Shelf ${s.n}: ${s.role}, ${s.company}`}
                  onClick={() => setPicked(i)}
                >
                  <span className="card-ghost" aria-hidden="true">{s.n}</span>
                  <span className="card-top">
                    <span className="card-n">{s.n}</span>
                    {s.current ? <span className="card-now">NOW</span> : <span className="card-period">{s.period}</span>}
                  </span>
                  <span className="card-bottom">
                    <span className="card-role">{s.role}</span>
                    <span className="card-company">{s.company}</span>
                    <span className="card-chip">{s.takeaway}</span>
                  </span>
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Reveal className="ambition-note">
        <span className="eyebrow">STILL MAKING ROOM FOR WHAT’S NEXT</span>
        <p>Every skill has a place.<br />The dream is to <em>build something of my own.</em></p>
      </Reveal>
    </section>
  );
}
