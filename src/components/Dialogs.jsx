import { useEffect, useRef } from 'react';
import { receiptDetail } from '../data.js';

function useDialog(open, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const onClick = (e) => {
    const d = ref.current;
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
    }
  };
  return { ref, onClick, onClose };
}

export function ProjectDialog({ item, theme, onClose }) {
  const dlg = useDialog(Boolean(item), onClose);
  const d = item?.detail;
  const art = item && (item.image || (theme === 'day' ? item.imageDay : item.imageNight));
  return (
    <dialog className="dialog" id="project-dialog" {...dlg}>
      <button className="dialog-close" onClick={onClose} aria-label="Close project">×</button>
      <div className="dialog-inner dialog-content">
        {d && (
          <>
            {art && <img className="picked-up-art" src={art} alt={item.imageAlt || d.title} />}
            <div className="picked-up-label">OFF THE SHELF / TAKE A CLOSER LOOK</div>
            <div className="eyebrow">{d.type}</div>
            <h2>{d.title}</h2>
            {d.intro && <p>{d.intro}</p>}
            <div className="dialog-grid">
              {d.problem && <div><h3>The question</h3><p>{d.problem}</p></div>}
              {d.approach && <div><h3>The direction</h3><p>{d.approach}</p></div>}
            </div>
            {d.details && (<><h3>Scope</h3><p>{d.details}</p></>)}
            {d.next && (<><h3>{d.nextLabel}</h3><p>{d.next}</p></>)}
            {d.footnote && <p className="contact-note">{d.footnote}</p>}
          </>
        )}
      </div>
    </dialog>
  );
}

export function ReceiptDialog({ open, onClose }) {
  const dlg = useDialog(open, onClose);
  return (
    <dialog className="dialog" id="receipt-dialog" {...dlg}>
      <button className="dialog-close" onClick={onClose} aria-label="Close receipt">×</button>
      <div className="dialog-inner receipt">
        <p className="eyebrow">CAREER RECEIPT / NO. 001</p>
        <h2>THUVARAKAN’S STORE</h2>
        <p>One career. Six perspectives.<br />One ambition from the start.</p>
        <div className="line">
          <dl>
            {receiptDetail.map(([t, d]) => (
              <span key={t} style={{ display: 'contents' }}><dt>{t}</dt><dd>{d}</dd></span>
            ))}
          </dl>
        </div>
        <div className="line"><strong>THE DREAM WAS ALWAYS TO BUILD SOMETHING OF MY OWN.</strong></div>
        <p>This store represents my ambition to become an entrepreneur. Each role is part of the experience I’m taking with me. — Thuvarakan</p>
      </div>
    </dialog>
  );
}
