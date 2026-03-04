import { useMemo } from "react";
import type { DrinkLog } from "../../type/types";
import { KEYS } from "../../utils/constants";
import { save, dayKey } from "../../utils/utils";
import "./HistoryPage.css";
import { HistoryChart } from "../../components/pages/History/HistoryChart";
import { DayGroup } from "../../components/pages/History/DayGroup";

interface HistoryPageProps {
    logs: DrinkLog[];
    setLogs: React.Dispatch<React.SetStateAction<DrinkLog[]>>;
    goal: number;
}

export default function HistoryPage({ logs, setLogs, goal }: HistoryPageProps) {

    const { groupedLogs, sortedDays, last7Days } = useMemo(() => {
        const byDay: Record<string, DrinkLog[]> = {};
        logs.forEach(l => {
            const k = dayKey(l.ts);
            (byDay[k] = byDay[k] ?? []).push(l);
        });

        const sortedKeys = Object.keys(byDay).sort((a, b) =>
            new Date(b).getTime() - new Date(a).getTime()
        );

        const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
        const now = new Date();
        const stats = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(now);
            d.setDate(now.getDate() - 6 + i);
            const key = d.toDateString();
            const total = (byDay[key] ?? []).reduce((s, l) => s + l.ml, 0);
            return {
                day: weekDays[d.getDay()],
                total,
                isToday: i === 6,
                met: total >= goal * 1000
            };
        });

        return { groupedLogs: byDay, sortedDays: sortedKeys, last7Days: stats };
    }, [logs, goal]);

    const removeLog = (id: number) => {
        const next = logs.filter(x => x.id !== id);
        updateLogs(next);
    };

    const clearDay = (dayStr: string) => {
        if (!window.confirm("Delete all entries for this day?")) return;
        const next = logs.filter(l => dayKey(l.ts) !== dayStr);
        updateLogs(next);
    };

    const updateLogs = (next: DrinkLog[]) => {
        setLogs(next);
        save(KEYS.logs, next);
    };

    return (
        <div className="history-container">
            <h2 className="history-title">History 📅</h2>

            <HistoryChart data={last7Days} goal={goal} />

            <div className="history-list">
                {sortedDays.length === 0 ? (
                    <div className="history-empty">No logs yet! 💧</div>
                ) : (
                    sortedDays.map(day => (
                        <DayGroup
                            key={day}
                            day={day}
                            logs={groupedLogs[day]}
                            goal={goal}
                            onRemove={removeLog}
                            onClear={() => clearDay(day)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}