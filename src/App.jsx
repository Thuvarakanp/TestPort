import { useEffect, useState } from 'react';
import Reveal from './components/Reveal.jsx';
import Entrance from './components/Entrance.jsx';
import Learning from './components/Learning.jsx';
import Toolkit from './components/Toolkit.jsx';
import Owner from './components/Owner.jsx';
import CareerShelves from './components/CareerShelves.jsx';
import { ProjectDialog, ReceiptDialog } from './components/Dialogs.jsx';
import { img, workCards, socials } from './data.js';

const STORAGE_KEY = 'thuvarakan-shop';

function initialTheme() {
  return document.documentElement.dataset.shop === 'night' ? 'night' : 'day';
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [paused, setPaused] = useState(false);
  const [project, setProject] = useState(null);
  const [receipt, setReceipt] = useState(false);
  const [ringText, setRingText] = useState('Ring for assistance ◉');

  useEffect(() => {
    document.documentElement.dataset.shop = theme;
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle('paused', paused);
    return () => document.body.classList.remove('paused');
  }, [paused]);

  const chooseTheme = (t) => {
    setTheme(t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch {}
  };

  const ring = () => {
    setRingText('Ding! You have my attention.');
    document.querySelector('#contact')?.scrollIntoView({ behavior: paused ? 'instant' : 'smooth' });
  };

  return (
    <>
      <header className="site-nav entrance-nav">
        <a className="brand" href="#entrance"><span>{theme === 'day' ? 'day shop' : 'night shop'}</span><span> / T.</span></a>
        <nav aria-label="Main navigation">
          <a href="#story">My story</a><a href="#work">The shelves</a><a href="#skills">The toolkit</a>
        </nav>
      </header>

      <main>
        <Entrance theme={theme} paused={paused} />

        <section className="inside-note">
          <span className="eyebrow">01 / COME ON IN</span>
          <p>Different roles.<br />The same dream: <em>build something of my own.</em></p>
          <div className="story-intro">My career began in graphic design. It took me through interfaces, code, consulting and UI UX engineering. Today, I work in QA. The ambition to become an entrepreneur has been there from the start.</div>
          <a className="story-link" href="#story">Here’s how the shelves filled up</a>
        </section>

        <div className="marquee store-marquee" aria-hidden="true">
          <div>
            {[0, 1].flatMap((k) =>
              ['DESIGNER’S EYE ✳', 'DEVELOPER’S UNDERSTANDING ✳', 'QA ENGINEER’S ATTENTION ✳'].map((t) => <span key={`${k}${t}`}>{t}</span>)
            )}
          </div>
        </div>

        <CareerShelves paused={paused} />

        <section className="stock" id="work">
          <Reveal className="section-heading">
            <div><span className="eyebrow">03 / ON THE SHELVES</span><h2>Design. Build. Test.</h2></div>
            <p>Work across product interfaces, visual communication and this portfolio’s own story.</p>
          </Reveal>
          <p className="sample-disclosure">A selection of responsibilities and contributions from my work experience.</p>
          <div className="shelf-grid">
            {workCards.map((c) => (
              <Reveal as="button" className="project-card stock-card" key={c.id} onClick={() => setProject(c.id)}>
                <div className="image-wrap">
                  <div className={`qa-cover ${c.cover}`}>
                    <span className="eyebrow">{c.eyebrow}</span>
                    <strong>{c.lines[0]}<br />{c.lines[1]}</strong>
                    <div className="cover-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  </div>
                </div>
                <div className="meta"><span>{c.company}</span><span>{c.kind}</span></div>
                <h3>{c.title}</h3>
                <span className="shelf-action">Explore the work</span>
              </Reveal>
            ))}
            <Reveal as="button" className="project-card stock-card" onClick={() => setProject('after')}>
              <div className="image-wrap">
                <img className="night-gallery" src={img('store.webp')} alt="The shop at night" loading="lazy" />
                <img className="day-gallery" src={img('store-owner-day.webp')} alt="Thuvarakan welcoming visitors to the shop in daylight" loading="lazy" />
              </div>
              <div className="meta"><span>04 / THIS PORTFOLIO</span><span>PERSONAL STORY</span></div>
              <h3>Day &amp; Night</h3>
              <span className="shelf-action">The story behind the store</span>
            </Reveal>
          </div>
        </section>

        <Owner onReceipt={() => setReceipt(true)} />

        <Toolkit />

        <Learning />

        <section className="process">
          <Reveal className="section-heading">
            <div><span className="eyebrow">07 / BEHIND THE COUNTER</span><h2>The way I see a product.</h2></div>
            <button className="bell" onClick={ring}>{ringText}</button>
          </Reveal>
          <div className="process-list">
            {[
              ['01 / THE DESIGNER', 'Does it make sense?', 'I look for usability, visual and accessibility issues, including flows that technically work but leave people stuck.'],
              ['02 / THE DEVELOPER', 'Can it work in practice?', 'I read source code, follow state changes and investigate asynchronous behaviour. Small fixes can become a pull request as well as a bug report.'],
              ['03 / THE QA ENGINEER', 'What happens when…?', 'I combine exploratory testing with repeatable automation, stable selectors and clear assertions. The findings need to be understandable and reproducible.'],
            ].map(([s, h, p]) => (
              <Reveal as="article" className="process-item" key={s}><span>{s}</span><h3>{h}</h3><p>{p}</p></Reveal>
            ))}
          </div>
        </section>

        <footer className="store-contact" id="contact">
          <span className="eyebrow">08 / THE NEXT CHAPTER</span>
          <h2>Still learning.<br />Still building.<br />Still dreaming bigger.</h2>
          <div className="contact-line">
            <div>
              <span className="availability">OPEN TO QA ROLES</span>
              <p className="role-interest">Manual, automation or hybrid QA.<br />Interested in remote or hybrid product teams where design, development and QA work together.</p>
            </div>
            <div className="direct-contact">
              <a href="mailto:thuvarakanmx@gmail.com">thuvarakanmx@gmail.com</a>
              <a href="tel:+94770322868">+94 77 032 2868</a>
              <span>Jaffna, Sri Lanka</span>
            </div>
          </div>
          <nav className="social-links" aria-label="Professional profiles">
            {socials.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer">{n}</a>)}
          </nav>
          <div className="footer-bottom">
            <span>THUVARAKAN / DAY SHOP &amp; NIGHT SHOP</span>
            <span>SIX ROLES. ONE DREAM. MORE TO COME.</span>
            <a href="#">Back to the top ↑</a>
          </div>
        </footer>
      </main>

      <div className="shop-switch" role="group" aria-label="Shop appearance">
        <button type="button" aria-pressed={theme === 'day'} onClick={() => chooseTheme('day')}><span aria-hidden="true">☀</span> Day Shop</button>
        <button type="button" aria-pressed={theme === 'night'} onClick={() => chooseTheme('night')}><span aria-hidden="true">☾</span> Night Shop</button>
      </div>
      <div className="floating-note">
        <a className="replay-entry" href="#entrance">Replay entrance ↺</a>
        <button className="motion-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>Motion: {paused ? 'off' : 'on'}</button>
      </div>

      <ProjectDialog projectId={project} theme={theme} onClose={() => setProject(null)} />
      <ReceiptDialog open={receipt} onClose={() => setReceipt(false)} />
    </>
  );
}
