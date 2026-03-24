import type { DrinkLog } from "../../../../type/types"; 
import { Trash2, X } from "lucide-react";

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
    <div className="border-l-4 border-[#84C1F8] pl-4">
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-[14px] text-gray-400 uppercase font-bold tracking-wider">
            {isGoalMet ? "Goal Reached" : "Daily Progress"}
          </p>
          <h4 className="text-[20px] font-bold text-[#1E1E1E]">{formattedDate}</h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-[#2D466E]">
            {(totalMl / 1000).toFixed(2)}L
          </span>
          <button onClick={onClear} className="text-gray-300 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {logs.map(log => {
          return (
            <div key={log.id} className="bg-[#F8F5F4] rounded-2xl flex justify-between items-center p-4 shadow-sm border border-gray-50">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[16px] font-bold text-[#1E1E1E]">
                    {log.ml}ml
                  </p>
                  <p className="text-[12px] text-gray-400">
                    {new Date(log.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemove(log.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-red-500 shadow-sm"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};