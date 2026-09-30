import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { img, receiptRows } from '../data.js';

const TABS = [
  { id: 'who', label: 'Who I am', text: 'I’m Thuvarakan Perinpanayagam, a QA engineer based in Jaffna, Sri Lanka, with a background in graphic design, UI engineering and UI/UX design. Design helps me spot where an experience feels wrong. Code helps me understand why. Testing brings both perspectives together.' },
  { id: 'how', label: 'How I work', text: 'I work across manual and automated testing, read source code to investigate defects, and document issues with clear steps and visual evidence. For small defects, I can also contribute the fix.' },
  { id: 'why', label: 'Why a store', text: 'That’s why this portfolio is a store. Becoming an entrepreneur has been my ambition from the beginning. This is a small expression of that dream: a place of my own, with everything I’ve learned on the shelves.' },
];
const STATS = [['6', 'roles so far'], ['2016', 'first role'], ['4', 'disciplines']];

export default function Owner({ onReceipt }) {
  const [tab, setTab] = useState('who');
  const active = TABS.find((t) => t.id === tab);

  return (
    <section className="owner" id="about" aria-labelledby="owner-title">
      <div className="owner-grid">
        <Reveal className="owner-photo">
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

          <div className="owner-tabs" role="tablist" aria-label="About me">
            {TABS.map((t) => (
              <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls="owner-panel"
                className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>
          <p className="owner-panel" id="owner-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} key={active.id}>{active.text}</p>

          <dl className="owner-stats">
            {STATS.map(([n, l]) => (
              <div key={l}><dt>{n}</dt><dd>{l}</dd></div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal className="owner-ticket">
        <div className="ticket-head">
          <span className="eyebrow">WHAT I’VE COLLECTED ALONG THE WAY</span>
          <button type="button" className="btn" onClick={onReceipt}>Read my story receipt</button>
        </div>
        <ol className="ticket-roles">
          {receiptRows.map(([name, mark], i) => (
            <li key={name} className={mark === 'NOW' ? 'now' : ''}>
              <span className="ticket-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="ticket-name">{name.replace(/^\d+ /, '')}</span>
              <span className="ticket-mark">{mark === '✓' ? '✓' : mark.toLowerCase()}</span>
            </li>
          ))}
          <li className="dream"><span className="ticket-n">★</span><span className="ticket-name">Entrepreneurship</span><span className="ticket-mark">the dream</span></li>
        </ol>
      </Reveal>
    </section>
  );
}
