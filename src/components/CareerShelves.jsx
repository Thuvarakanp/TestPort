import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { careerShelves } from '../data.js';

export default function CareerShelves() {
  const [openIdx, setOpenIdx] = useState(0);
  const current = openIdx === null ? null : careerShelves[openIdx];

  return (
    <section className="career-stock merged-story" id="story" aria-labelledby="story-title">
      <div className="experience-layout">
        <div className="experience-intro">
          <span className="eyebrow">02 / HOW THE SHELVES FILLED UP</span>
          <h2 id="story-title">A store built<br />from <em>experience.</em></h2>
          <p>Every role left something on the shelves. An eye for design. An understanding of code. A habit of asking better questions.</p>
          <p className="browse-hint">Open a shelf to see the work and what I took with me.</p>
          <div className="inventory-readout" aria-hidden="true">
            <span className="eyebrow">ON THIS SHELF</span>
            <div className="inventory-count"><span>{current ? current.n : '—'}</span><small>/ 06</small></div>
            <span className="inventory-skill">{current ? current.takeaway : 'Choose a shelf'}</span>
          </div>
          <span className="story-thread">DESIGN · DEVELOPMENT · CONSULTING · QA</span>
        </div>
        <div className="experience-shelves">
          {careerShelves.map((s, i) => (
            <details
              key={s.n}
              className={`experience-shelf${s.current ? ' shelf-current' : ''}`}
              open={openIdx === i}
              onToggle={(e) => {
                const isOpen = e.currentTarget.open;
                if (isOpen) setOpenIdx(i);
                else setOpenIdx((prev) => (prev === i ? null : prev));
              }}
            >
              <summary>
                <span className="shelf-index" aria-hidden="true">{s.n}</span>
                <span className="shelf-heading">
                  <span className="shelf-meta">{s.period}{s.current && <> <span className="now-label">CURRENT</span></>}</span>
                  <span className="shelf-role">{s.role}</span>
                  <span className="shelf-company">{s.company}</span>
                </span>
                <span className="shelf-toggle" aria-hidden="true" />
              </summary>
              <div className="shelf-content">
                <h3>{s.title}</h3>
                <div className="shelf-details-grid">
                  <div><span className="eyebrow">ON THE JOB</span><p>{s.job}</p></div>
                  <div><span className="eyebrow">WHAT I BROUGHT FORWARD</span><p>{s.forward}</p></div>
                </div>
                <div className="stock-label"><span>ADDED TO THE STORE</span><strong>{s.takeaway}</strong></div>
              </div>
            </details>
          ))}
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
