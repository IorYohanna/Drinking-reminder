import type { ReactNode } from "react";

const Modal = ({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-end justify-center bg-black/45">
      <div onClick={e => e.stopPropagation()} style={{ filter: "url(#sk2)" }} className="bg-p-paper border-[3px] border-p-ink rounded-t-[20px] w-full max-w-105 px-5 pt-6 pb-10 max-h-[88vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4.5">
          <span className="font-caveat text-[26px] font-bold text-p-ink">{title}</span>
          <button onClick={onClose} className="font-caveat text-[26px] bg-none border-none cursor-pointer text-p-muted">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;