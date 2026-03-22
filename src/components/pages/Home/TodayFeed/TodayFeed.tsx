import type { DrinkLog } from "../../../../type/types";
import { DRINK_TYPES } from "../../../../utils/constants";

interface TodayFeedProps {
    logs: DrinkLog[],
    onRemove: (id: number) => void
}

export const TodayFeed = ({ logs, onRemove }: TodayFeedProps) => {
    if (logs.length === 0) return null;

    return (
        <div className="flex flex-col gap-3 mt-2 pb-8">
            <p className="text-lg font-bold text-[#2C1816]">Today's log</p>
            {logs.slice(0, 4).map(l => {
                const dt = DRINK_TYPES.find(d => d.id === l.type) ?? DRINK_TYPES[0];
                return (
                    <div key={l.id} className="bg-[#F8F5F4] rounded-3xl flex justify-between items-center p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[24px] shadow-sm">
                                {dt.icon}
                            </div>
                            <div>
                                <div className="text-[17px] font-bold text-[#2C1816]">{l.ml}ml — {dt.label}</div>
                                <div className="text-[13px] text-gray-500 font-medium">
                                    {new Date(l.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => onRemove(l.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors shadow-sm"
                        >
                            ✕
                        </button>
                    </div>
                );
            })}
            {logs.length > 4 && (
                <p className="text-[13px] font-medium text-center text-gray-400 mt-2">
                    +{logs.length - 4} more entries in History
                </p>
            )}
        </div>
    );
};