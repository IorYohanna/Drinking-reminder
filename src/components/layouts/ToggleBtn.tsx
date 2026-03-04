const ToggleBtn = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
  <button
    onClick={() => onChange(!enabled)}
    style={{ filter: "url(#sk)" }}
    className={`relative shrink-0 w-11 h-6 rounded-xl border-2 border-p-ink transition-colors duration-200 cursor-pointer ${enabled ? 'bg-p-green' : 'bg-[#d0c8bc]'}`}
  >
    <div
      style={{ filter: "url(#sk)" }}
      className={`absolute top-[1px] w-[18px] h-[18px] bg-white rounded-full border-2 border-p-ink transition-all duration-200 ${enabled ? 'left-[20px]' : 'left-[1px]'}`}
    />
  </button>
);

export default ToggleBtn