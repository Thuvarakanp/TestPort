import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { img, receiptRows } from '../data.js';

const TABS = [
  { id: 'who', label: 'Who I am', text: 'I’m Thuvarakan Perinpanayagam, a QA engineer based in Jaffna, Sri Lanka, with a background in graphic design, UI engineering and UI/UX design. Design helps me spot where an experience feels wrong. Code helps me understand why. Testing brings both perspectives together.' },
  { id: 'how', label: 'How I work', text: 'I work across manual and automated testing, read source code to investigate defects, and document issues with clear steps and visual evidence. For small defects, I can also contribute the fix.' },
  { id: 'why', label: 'Why a store', text: 'That’s why this portfolio is a store. Becoming an entrepreneur has been my ambition from the beginning. This is a small expression of that dream: a place of my own, with everything I’ve learned on the shelves.' },
];
const STATS = [[6, 'roles so far'], [2016, 'first role'], [4, 'disciplines']];
const AUTO_MS = 9000;

// Counts up once when scrolled into view (jumps straight to the value for reduced motion).
function CountUp({ to }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setVal(to);
    let raf;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / 1100);
        setVal(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{val}</span>;
}

export default function Owner({ onReceipt }) {
  const [tab, setTab] = useState('who');
  const [auto, setAuto] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hold, setHold] = useState(false);
  const active = TABS.find((t) => t.id === tab);

  // Gently cycles through the tabs until the visitor takes over.
  useEffect(() => {
    if (!auto || hold) return;
    const id = setTimeout(() => setTab(TABS[(TABS.findIndex((t) => t.id === tab) + 1) % TABS.length].id), AUTO_MS);
    return () => clearTimeout(id);
  }, [auto, hold, tab]);
  const choose = (id) => { setAuto(false); setTab(id); };

  return (
    <section className="owner" id="about" aria-labelledby="owner-title">
      <div className="owner-grid">
        <Reveal className="owner-photo">
          <svg className="owner-stamp" viewBox="0 0 120 120" aria-hidden="true">
            <defs><path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
            <text><textPath href="#stamp-circle">DESIGN ✳ CODE ✳ QA ✳ DESIGN ✳ CODE ✳ QA ✳</textPath></text>
            <circle cx="60" cy="60" r="6" />
          </svg>
          <div className="owner-frame">
            <img src={img('owner-studio-suit.webp')} width="1086" height="1448" loading="lazy"
              alt="Thuvarakan wearing glasses, a dark charcoal suit and a white shirt in a studio portrait" />
          </div>
          <div className="owner-badge">
            <span className="badge-dot" aria-hidden="true" />
            <div>
              <strong>Thuvarakan Perinpanayagam</strong>
              <span>QA Engineer · Jaffna, Sri Lanka</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="owner-copy">
          <span className="eyebrow">04 / MEET THE OWNER</span>
          <h2 id="owner-title">QA engineer today.<br /><em>Entrepreneur in the making.</em></h2>

          <div className="owner-tabs" role="tablist" aria-label="About me" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
            {TABS.map((t) => (
              <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls="owner-panel"
                className={tab === t.id ? 'on' : ''} onClick={() => choose(t.id)}>{t.label}<i aria-hidden="true" style={auto && !hold ? { animationDuration: `${AUTO_MS}ms` } : undefined} /></button>
            ))}
          </div>
          <p className="owner-panel" id="owner-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} key={active.id}>{active.text}</p>

          <dl className="owner-stats">
            {STATS.map(([n, l]) => (
              <div key={l}><dt><CountUp to={n} /></dt><dd>{l}</dd></div>
            ))}
          </dl>
          <div className="owner-cta">
            <a className="btn fill" href="mailto:thuvarakanmx@gmail.com">Say hello</a>
            <a className="owner-link" href="#contact">See how to reach me →</a>
          </div>
        </Reveal>
      </div>

      <Reveal className="owner-ticket">
        <div className="ticket-head">
          <span className="eyebrow">WHAT I’VE COLLECTED ALONG THE WAY</span>
          <button type="button" className="btn" onClick={onReceipt}>Read my story receipt</button>
        </div>
        <ol className="journey">
          {receiptRows.map(([name, mark], i) => (
            <li key={name} className={mark === 'NOW' ? 'now' : ''} style={{ '--i': i }}>
              <span className="j-dot" aria-hidden="true" />
              <span className="j-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="j-name">{name.replace(/^\d+ /, '')}</span>
              <span className="j-mark">{mark === '✓' ? 'done' : mark.toLowerCase()}</span>
            </li>
          ))}
          <li className="dream" style={{ '--i': receiptRows.length }}>
            <span className="j-dot" aria-hidden="true" />
            <span className="j-n">★</span><span className="j-name">Entrepreneurship</span><span className="j-mark">the dream</span>
          </li>
        </ol>
      </Reveal>
    </section>
  );
}
