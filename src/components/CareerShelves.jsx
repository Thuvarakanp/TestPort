import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { careerShelves } from '../data.js';

const TOTAL = careerShelves.length;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
// Small fixed wobble per crate so the stack looks hand-placed, not gridded.
const TILTS = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2];
const DROPS = [-14, 9, -6, 12, -10, 7];

function Barcode({ seed }) {
  const bars = Array.from({ length: 22 }, (_, i) => ((seed * 7 + i * 13) % 5) + 1);
  return (
    <span className="barcode" aria-hidden="true">
      {bars.map((w, i) => <i key={i} style={{ width: w }} />)}
    </span>
  );
}

export default function CareerShelves({ paused }) {
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
      if (reduced.matches || narrow.matches || paused) return setLanded(TOTAL);
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
  }, [paused]);

  // A new delivery arriving takes the spotlight back from a manual pick.
  useEffect(() => setPicked(null), [landed]);

  const selectedIdx = landed === 0 ? null : picked !== null && picked < landed ? picked : landed - 1;
  const sel = selectedIdx === null ? null : careerShelves[selectedIdx];

  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    e.currentTarget.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const untilt = (e) => {
    e.currentTarget.style.setProperty('--mx', 0);
    e.currentTarget.style.setProperty('--my', 0);
  };

  return (
    <section className="career-stock stockroom" id="story" aria-labelledby="story-title">
      <div className="stock-track" ref={trackRef}>
        <div className="stock-sticky">
          <div className="stock-side">
            <span className="eyebrow">02 / HOW THE SHELVES FILLED UP</span>
            <h2 id="story-title">Fresh stock,<br />every <em>chapter.</em></h2>
            <div className="delivery" aria-hidden="true">
              <span>DELIVERY</span>
              <b>{String(landed).padStart(2, '0')}<small> / 0{TOTAL}</small></b>
              <div className="delivery-bar"><i style={{ width: `${(landed / TOTAL) * 100}%` }} /></div>
            </div>

            <div className="stock-detail" aria-live="polite">
              {sel ? (
                <div key={sel.n} className="stock-detail-inner">
                  <div className="detail-head">
                    <span>SHELF {sel.n}</span>
                    <span>{sel.period}{sel.current && <em className="now-label">CURRENT</em>}</span>
                  </div>
                  <h3>{sel.role}</h3>
                  <p className="detail-company">{sel.company}</p>
                  <p className="detail-title">“{sel.title}”</p>
                  <dl>
                    <dt>On the job</dt><dd>{sel.job}</dd>
                    <dt>Brought forward</dt><dd>{sel.forward}</dd>
                  </dl>
                  <div className="price-tag"><span>ADDED TO THE STORE</span><strong>{sel.takeaway}</strong></div>
                  <Barcode seed={Number(sel.n)} />
                </div>
              ) : (
                <p className="detail-empty">The shelves are empty. Keep scrolling. A delivery is on its way.</p>
              )}
            </div>
          </div>

          <div className="stock-shelf">
            {careerShelves.map((s, i) => {
              const isLanded = i < landed;
              return (
                <div className="slot" key={s.n}>
                  <span className="slot-ghost" aria-hidden="true">{s.n}</span>
                  <button
                    type="button"
                    className={`crate${isLanded ? ' landed' : ''}${selectedIdx === i ? ' selected' : ''}${s.current ? ' is-now' : ''}`}
                    style={{ '--tilt': `${TILTS[i]}deg`, '--drift': `${DROPS[i]}px` }}
                    disabled={!isLanded}
                    tabIndex={isLanded ? 0 : -1}
                    aria-hidden={!isLanded}
                    aria-pressed={selectedIdx === i}
                    aria-label={`Shelf ${s.n}: ${s.role}, ${s.company}`}
                    onClick={() => setPicked(i)}
                    onPointerMove={tilt}
                    onPointerLeave={untilt}
                  >
                    <span className="crate-body">
                      <span className="tape" aria-hidden="true" />
                      <span className="scan" aria-hidden="true" />
                      <span className="crate-n">{s.n}</span>
                      <span className="crate-label">
                        <span className="crate-period">{s.period}</span>
                        <span className="crate-role">{s.role}</span>
                        <span className="crate-company">{s.company}</span>
                      </span>
                      <span className="crate-stamp" aria-hidden="true">{s.takeaway}</span>
                      {s.current && <span className="crate-now" aria-hidden="true">NOW</span>}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Reveal className="ambition-note">
        <span className="eyebrow">STILL MAKING ROOM FOR WHAT’S NEXT</span>
        <p>Every skill has a place.<br />The dream is to <em>build something of my own.</em></p>
        <span className="ambition-signature">Thuvarakan</span>
      </Reveal>
    </section>
  );
}
