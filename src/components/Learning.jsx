import Reveal from './Reveal.jsx';

const EDUCATION = [
  { year: '2021', title: 'B.Sc in Interactive Media', where: 'Sri Lanka Institute of Information Technology', note: 'Studies began in 2021', main: true },
  { year: '2021', title: 'Psychology & Basic Counseling', where: 'University of Peradeniya', note: 'Additional learning' },
  { year: '2017', title: 'Six-month coding programme', where: 'Uki Coding School', note: 'Run by Yarl IT Hub' },
  { year: '2017', title: 'English for Adults', where: 'British Council', note: 'Additional learning' },
  { year: '2016', title: 'Ground Zero information security training', where: 'InfoSec, India', note: 'Additional learning' },
];
const PEOPLE = ['Team management', 'Risk management', 'Negotiation', 'Conflict resolution', 'Time management', 'Teamwork'];
const LANGUAGES = [['Tamil', 'Native and fluent', 5], ['English', 'Professional', 4], ['Sinhala', 'Elementary', 2]];

export default function Learning() {
  return (
    <section className="learning ln" id="background" aria-labelledby="learning-title">
      <Reveal className="section-heading">
        <div><span className="eyebrow">06 / ALWAYS ADDING TO THE SHELVES</span><h2 id="learning-title">Learning beyond the role.</h2></div>
        <p>Education, community and the people skills that support my work.</p>
      </Reveal>

      <div className="ln-grid">
        <Reveal className="ln-edu">
          <div className="ln-card-head"><span className="eyebrow">EDUCATION</span><span className="ln-count">{String(EDUCATION.length).padStart(2, '0')}</span></div>
          <h3>Interactive media &amp; code.</h3>
          <ol className="ln-timeline">
            {EDUCATION.map((e, i) => (
              <li key={e.title} className={e.main ? 'main' : ''} style={{ '--i': i }}>
                <span className="ln-year">{e.year}</span>
                <span className="ln-dot" aria-hidden="true" />
                <div>
                  <strong>{e.title}</strong>
                  <span className="ln-where">{e.where}</span>
                  <span className="ln-note">{e.note}</span>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="ln-side">
          <Reveal className="ln-card ln-community">
            <div className="ln-card-head"><span className="eyebrow">COMMUNITY</span></div>
            <h3>A shared interest in building.</h3>
            <span className="ln-tag">Volunteer · since 2015</span>
            <p>Yarl IT Hub is a not-for-profit social enterprise inspiring, supporting and nurturing technology, innovation and entrepreneurship in the community. I’ve volunteered with them since 2015. It connects closely with my own ambition to build a business.</p>
          </Reveal>

          <Reveal className="ln-card">
            <div className="ln-card-head"><span className="eyebrow">WORKING WITH PEOPLE</span></div>
            <ul className="ln-chips">{PEOPLE.map((p) => <li key={p}>{p}</li>)}</ul>
          </Reveal>

          <Reveal className="ln-card">
            <div className="ln-card-head"><span className="eyebrow">LANGUAGES</span><span className="ln-lets">Let’s talk.</span></div>
            <ul className="ln-langs">
              {LANGUAGES.map(([name, level, n]) => (
                <li key={name}>
                  <span className="ln-lang">{name}</span>
                  <span className="ln-meter" role="img" aria-label={`${level}: ${n} of 5`}>
                    {[1, 2, 3, 4, 5].map((k) => <i key={k} className={k <= n ? 'on' : ''} style={{ '--k': k }} />)}
                  </span>
                  <span className="ln-level">{level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
