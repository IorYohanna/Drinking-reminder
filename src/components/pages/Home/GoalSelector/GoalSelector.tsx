interface GoalSelectorProps {
  value: number;
  onChange: (v: number) => void;
  onSave: () => void;
}

export const GoalSelector = ({ value, onChange, onSave }: GoalSelectorProps) => {
  const presets = [1, 1.5, 2, 3];

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-[30px] p-4 mb-6 flex flex-col items-center shadow-sm">
          <p className="text-[#43414C] font-novaSquare text-sm mb-1">Choose Your Daily Goal</p>
          <div className="flex items-center gap-1 font-novaSquare font-bold">
            <span className="text-black text-sm">custom:</span>
            <input 
              type="number"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="bg-transparent border-none text-black w-10 text-center outline-none focus:ring-0 p-0"
            />
            <span className="text-black text-sm">L</span>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4 w-full">
          {presets.map((g) => (
            <button
              key={g}
              onClick={() => onChange(g)}
              className={`h-25 rounded-[30px] backdrop-blur-md border transition-all flex items-center justify-center ${
                value === g 
                  ? 'bg-[#2D466E]/40 border-white/50 scale-[0.98]' 
                  : 'bg-white/20 border-white/30 hover:bg-white/30'
              }`}
            >
              <span className="font-novaSquare text-[28px] font-bold text-[#2D466E]">
                {g}L
              </span>
            </button>
          ))}

          <button 
            onClick={onSave}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-13.75 h-13.75 bg-[#43414C] rounded-full border-2 border-white/50 shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-20"
          >
            <span className="text-white font-novaSquare text-[12px]">save</span>
          </button>
        </div>
      </div>
    </div>
  );
};