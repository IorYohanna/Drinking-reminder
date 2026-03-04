import "./NavTab.css";

interface NavTabProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const NavTab = ({ icon, label, active, onClick }: NavTabProps) => {
  const activeStyles = active 
    ? "text-p-green font-bold border-p-green" 
    : "text-p-muted font-medium border-transparent";

  return (
    <button 
      onClick={onClick} 
      className={`nav-tab ${activeStyles}`}
    >
      <span className="nav-tab-icon">{icon}</span>
      <span className="text-xs uppercase tracking-wide">{label}</span>
    </button>
  );
};