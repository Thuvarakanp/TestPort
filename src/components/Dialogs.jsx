import { useEffect, useRef } from 'react';
import { projectData, receiptDetail, img } from '../data.js';

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

export function ProjectDialog({ projectId, theme, onClose }) {
  const dlg = useDialog(Boolean(projectId), onClose);
  const d = projectId && projectData[projectId];
  const isAfter = projectId === 'after';
  return (
    <dialog className="dialog" id="project-dialog" {...dlg}>
      <button className="dialog-close" onClick={onClose} aria-label="Close project">×</button>
      <div className="dialog-inner dialog-content">
        {d && (
          <>
            {isAfter && (
              <img
                className="picked-up-art"
                src={img(theme === 'day' ? 'store-owner-day.webp' : 'store-owner.webp')}
                alt="Thuvarakan’s storefront portfolio"
              />
            )}
            <div className="picked-up-label">OFF THE SHELF / TAKE A CLOSER LOOK</div>
            <div className="eyebrow">{d.type}</div>
            <h2>{d.title}</h2>
            <p>{d.intro}</p>
            <div className="dialog-grid">
              <div><h3>The question</h3><p>{d.problem}</p></div>
              <div><h3>The direction</h3><p>{d.approach}</p></div>
            </div>
            <h3>Scope</h3>
            <p>{d.details}</p>
            <h3>{isAfter ? 'Next step' : 'Role & period'}</h3>
            <p>{d.next}</p>
            <p className="contact-note">{isAfter ? 'The story behind this personal portfolio.' : 'Work overview based on my résumé.'}</p>
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
