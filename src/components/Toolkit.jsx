import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { toolkit } from '../data.js';

const STEPS = [
  ['Environment', 'Where it happened: build, browser, device, data.'],
  ['Reproduction steps', 'The exact path to the problem, in order.'],
  ['Expected vs actual', 'What should happen, and what does.'],
  ['Severity', 'How much it matters to users and the release.'],
  ['Evidence', 'Annotated screenshots or a short recording.'],
  ['Context', 'Enough for a developer to investigate without another round of questions.'],
];

export default function Toolkit() {
  const [group, setGroup] = useState(0);
  const [step, setStep] = useState(0);
  const [title, tools] = toolkit[group];
  const total = toolkit.reduce((n, [, items]) => n + items.length, 0);

  return (
    <section className="toolkit tk" id="skills" aria-labelledby="toolkit-title">
      <Reveal className="section-heading">
        <div><span className="eyebrow">05 / TOOLS OF THE TRADE</span><h2 id="toolkit-title">What’s behind the counter.</h2></div>
        <p>Tools for checking the interface, understanding the code and making issues easy to act on.</p>
      </Reveal>

      <Reveal className="tk-board">
        <div className="tk-nav" role="tablist" aria-label="Tool categories" aria-orientation="vertical">
          {toolkit.map(([name, items], i) => (
            <button key={name} type="button" role="tab" aria-selected={group === i} aria-controls="tk-panel" className={group === i ? 'on' : ''}
              onClick={() => setGroup(i)} onMouseEnter={() => setGroup(i)}>
              <span className="tk-nav-n">{name.slice(0, 2)}</span>
              <span className="tk-nav-name">{name.slice(5)}</span>
              <span className="tk-nav-count">{String(items.length).padStart(2, '0')}</span>
            </button>
          ))}
          <p className="tk-total"><b>{total}</b> tools across {toolkit.length} areas</p>
        </div>

        <div className="tk-panel" id="tk-panel" role="tabpanel" key={group}>
          <div className="tk-panel-head">
            <span className="eyebrow">{title}</span>
            <span className="tk-big" aria-hidden="true">{title.slice(0, 2)}</span>
          </div>
          <ul className="tk-tools">
            {tools.map((t, i) => (
              <li key={t} style={{ '--i': i }}><span>{String(i + 1).padStart(2, '0')}</span>{t}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="tk-report">
        <div className="tk-report-head">
          <span className="eyebrow">HOW I REPORT A DEFECT</span>
          <p>Six things in every report, so nobody has to ask a follow-up question.</p>
        </div>
        <ol className="tk-steps">
          {STEPS.map(([name], i) => (
            <li key={name} className={`${i === step ? 'on' : ''}${i < step ? ' done' : ''}`}>
              <button type="button" onClick={() => setStep(i)} onMouseEnter={() => setStep(i)} aria-pressed={i === step}>
                <span className="tk-step-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="tk-step-name">{name}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="tk-step-text" key={step} aria-live="polite">{STEPS[step][1]}</p>
      </Reveal>
    </section>
  );
}
