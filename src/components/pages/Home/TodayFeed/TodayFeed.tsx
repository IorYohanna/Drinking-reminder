import type { DrinkLog } from "../../../../type/types";
import { DRINK_TYPES } from "../../../../utils/constants";
import { Card } from "../../../ui/Card"; 

interface TodayFeedProps {
    logs: DrinkLog[],
    onRemove: (id: number) => void
}

export const TodayFeed = ({ logs, onRemove }: TodayFeedProps) => {
    if (logs.length === 0) return null;

    return (
        <div className="flex flex-col gap-2">
            <p className="font-caveat text-lg text-p-muted">Today's log</p>
            {logs.slice(0, 4).map(l => {
                const dt = DRINK_TYPES.find(d => d.id === l.type) ?? DRINK_TYPES[0];
                return (
                    <Card key={l.id} className="flex justify-between items-center py-2.5 px-3.5">
                        <div className="flex items-center gap-3">
                            <span className="text-[22px]">{dt.icon}</span>
                            <div>
                                <div className="font-caveat text-lg text-p-ink leading-none">{l.ml}ml — {dt.label}</div>
                                <div className="font-caveat text-[13px] text-p-muted">
                                    {new Date(l.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => onRemove(l.id)} className="text-p-muted hover:text-red-400 transition-colors">✕</button>
                    </Card>
                );
            })}
            {logs.length > 4 && (
                <p className="font-caveat text-sm text-p-muted text-center italic">
                    +{logs.length - 4} more entries in History
                </p>
            )}
        </div>
    );
};