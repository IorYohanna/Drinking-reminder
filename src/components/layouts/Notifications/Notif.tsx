import type { Reminder } from "../../../type/types"; 
import "./Notif.css";

interface ToastProps {
  data: Reminder | null;
  onClose: () => void;
}

export default function Notif({ data, onClose }: ToastProps) {
  if (!data) return null;

  return (
    <div className="toast-container">
      <span className="toast-icon">{data.icon}</span>
      <div>
        <div className="toast-title">Time to drink! 💧</div>
        <div className="toast-subtitle">{data.label}</div>
      </div>
      <button 
        onClick={onClose} 
        className="toast-close"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}