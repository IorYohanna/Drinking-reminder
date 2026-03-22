import type { DrinkLog } from "../../../../type/types"; 
import { DRINK_TYPES } from "../../../../utils/constants";
import { Card } from "../../../ui/Card"; 

interface DayGroupProps {
  day: string;
  logs: DrinkLog[];
  goal: number;
  onRemove: (id: number) => void;
  onClear: () => void;
}

export const DayGroup = ({ day, logs, goal, onRemove, onClear }: DayGroupProps) => {
  const totalMl = logs.reduce((s, l) => s + l.ml, 0);
  const isGoalMet = totalMl >= goal * 1000;
  
  const formattedDate = new Date(day).toLocaleDateString("en-US", { 
    weekday: "short", month: "short", day: "numeric" 
  });

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[19px] font-bold">
          {isGoalMet ? "✅ " : ""}{formattedDate}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-lg ${isGoalMet ? '' : ''}`}> 
            {(totalMl / 1000).toFixed(2)}L
          </span>
          <button onClick={onClear} className="bg-none border-none cursor-pointer text-base opacity-70 hover:opacity-100">
            🗑️
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {logs.map(log => {
          const type = DRINK_TYPES.find(t => t.id === log.type) ?? DRINK_TYPES[0];
          return (
            <Card key={log.id} className="flex justify-between items-center py-2 px-3.5">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{type.icon}</span>
                <span className="text-[17px]">
                  {log.ml}ml — {type.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {new Date(log.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <button onClick={() => onRemove(log.id)} className="bg-none border-none cursor-pointer">✕</button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};