import { useEffect, type ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    backgroundColor?: string;
    backgroundImageUrl?: string; 
    backgroundOpacity?: number;
}

const Modal = ({ open, onClose, title, children, backgroundColor, backgroundImageUrl, backgroundOpacity }: ModalProps) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [open]);

    if (!open) return null;

   const modalStyle = {
        backgroundColor: backgroundColor || undefined,
        "--bg-image": backgroundImageUrl ? `url(${backgroundImageUrl})` : "none",
        "--bg-opacity": backgroundOpacity,
    } as React.CSSProperties;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                style={modalStyle}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative flex items-center justify-center mb-4.5">
                    <h2 className="text-[26px] font-bold m-0 text-center text-white">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="modal-close-btn absolute right-0 text-white/80 hover:text-white"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="modal-body relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;