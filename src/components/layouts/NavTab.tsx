export const NavTab = ({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-[2px] py-2 px-2.5 font-caveat text-xs bg-transparent border-none border-b-[3px] cursor-pointer transition-colors ${active ? 'text-p-green font-bold border-p-green' : 'text-p-muted font-medium border-transparent'}`}
  >
    <span className="text-[22px]">{icon}</span>{label}
  </button>
);
