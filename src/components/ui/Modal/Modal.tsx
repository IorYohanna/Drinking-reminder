import { useEffect, type ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [open]);

    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4.5">
                    <h2 className="font-caveat text-[26px] font-bold text-p-ink m-0">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="modal-close-btn"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;