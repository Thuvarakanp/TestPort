import { useEffect, useRef, useState } from 'react';
import { img } from '../data.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (v) => v * v * (3 - 2 * v);

function Scene({ cls, base, closed }) {
  return (
    <div className={`scene-plane ${cls}`} aria-hidden="true">
      <img className="scene-base" src={img(base)} alt="" fetchPriority="high" width="1536" height="1024" />
      <div className="door door-left"><img src={img(closed)} alt="" width="1536" height="1024" /></div>
      <div className="door door-right"><img src={img(closed)} alt="" width="1536" height="1024" /></div>
    </div>
  );
}

export default function Entrance({ theme }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [message, setMessage] = useState('Closed. But not for you.');
  const [label, setLabel] = useState('SCROLL TO OPEN THE DOORS');

  useEffect(() => {
    const imgs = [...stageRef.current.querySelectorAll('img')];
    Promise.all(imgs.map((i) => i.decode().catch(() => {}))).then(() => setReady(true));
  }, []);

  useEffect(() => {
    const entrance = sectionRef.current;
    const stage = stageRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let pending = false;

    function render() {
      pending = false;
      const staticMode = reduced.matches;
      document.body.classList.toggle('entrance-static', staticMode);
      const distance = entrance.offsetHeight - innerHeight;
      const p = staticMode ? 1 : clamp(-entrance.getBoundingClientRect().top / Math.max(distance, 1));
      const openAmt = ease(clamp((p - 0.12) / 0.52));
      const intro = 1 - ease(clamp((p - 0.1) / 0.24));
      const g = ease(clamp((p - 0.58) / 0.18));
      stage.style.setProperty('--door-angle', `${(openAmt * 106).toFixed(3)}deg`);
      stage.style.setProperty('--zoom', (1 + ease(p) * 0.12).toFixed(4));
      stage.style.setProperty('--light', (0.76 + openAmt * 0.24).toFixed(4));
      stage.style.setProperty('--intro', intro.toFixed(4));
      stage.style.setProperty('--welcome', g.toFixed(4));
      stage.style.setProperty('--progress', p.toFixed(4));
      setOpen(openAmt > 0.6);
      setGreeting(g > 0.9);
      setMessage(p < 0.16 ? 'Closed. But not for you.' : p < 0.65 ? 'Opening up. Come on in.' : 'Open. Glad you’re here.');
      setLabel(p < 0.16 ? 'SCROLL TO OPEN THE DOORS' : p < 0.65 ? 'COME A LITTLE CLOSER' : 'KEEP SCROLLING FOR MY STORY');
    }
    const schedule = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(render);
      }
    };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    render();
    return () => {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
      document.body.classList.remove('entrance-static');
    };
  }, []);

  return (
    <section className="entrance" id="entrance" ref={sectionRef} aria-label="Scroll to open the store and meet your host">
      <div className={`entrance-sticky${ready ? ' scene-ready' : ''}${open ? ' is-open' : ''}`} ref={stageRef}>
        <Scene cls="night-scene" base="store-owner.webp" closed="store-closed.webp" />
        <Scene cls="day-scene" base="store-owner-day.webp" closed="store-closed-day.webp" />
        <div className="scene-shade" />
        <div className="entrance-caption">
          <span className="eyebrow">
            THUVARAKAN / QA ENGINEER{' '}
            <span className="shop-caption">
              {theme === 'day' ? 'DAY SHOP · A NEW DAY, SAME DREAM' : 'NIGHT SHOP · THE DREAM STAYS LIT'}
            </span>
          </span>
          <span className="scene-status"><i /><span>{message}</span></span>
        </div>
        <div className="closed-copy">
          <p className="eyebrow">SIX ROLES. ONE ENTREPRENEURIAL DREAM.</p>
          <h1>Always wanted<br />a shop of <em>my own.</em></h1>
          <p className="invitation">I’m Thuvarakan. I’ve designed it, built it, and now I test it.<br />This store is how I tell my story.</p>
        </div>
        <div className={`owner-welcome${greeting ? ' visible' : ''}`} aria-live="polite" aria-hidden={!greeting}>
          <span className="eyebrow">YOUR HOST / THUVARAKAN</span>
          <h2>Hello, I’m Thuvarakan.</h2>
          <p>I’ve always wanted to build a business of my own.<br />Welcome in. Every role has added something to this store.</p>
          <a className="btn fill" href="#story" tabIndex={greeting ? 0 : -1}>Let me show you my story</a>
        </div>
        <div className="entrance-bottom">
          <div className="scroll-invitation">
            <span className="scroll-line" />
            <div><span>{label}</span><small>A LITTLE FURTHER. I'M JUST INSIDE.</small></div>
          </div>
          <a className="skip-intro" href="#work">Skip to the work ↗</a>
        </div>
        <div className="scene-progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
