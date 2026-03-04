import { Btn } from "../../../ui/Button"; 
import { TI } from "../../../ui/TextInput"; 

interface GoalSelectorProps {
  value: number;
  onChange: (v: number) => void;
  onSave: () => void;
}

export const GoalSelector = ({ value, onChange, onSave }: GoalSelectorProps) => {
  const presets = [1.5, 2, 2.5, 3, 3.5];

  return (
    <div className="flex flex-col gap-4">
      <p className="font-caveat text-base text-p-muted">Choose or type your daily target</p>
      
      <div className="flex gap-2 flex-wrap">
        {presets.map(g => (
          <button 
            key={g} 
            onClick={() => onChange(g)} 
            className={`goal-preset-btn ${value === g ? 'active' : ''}`}
          >
            {g}L
          </button>
        ))}
      </div>

      <TI
        type="number" 
        value={value} 
        onChange={e => onChange(Number(e.target.value))} 
        placeholder="Custom goal (L)..."
      />
      
      <Btn onClick={onSave} className="w-full p-3.5 text-xl">Save ✓</Btn>
    </div>
  );
};