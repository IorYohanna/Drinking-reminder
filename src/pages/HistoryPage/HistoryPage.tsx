import { useMemo } from "react";
import type { DrinkLog } from "../../type/types";
import { KEYS } from "../../utils/constants";
import { save, dayKey } from "../../utils/utils";
import { TodayFeed } from "../../components/pages/History/TodayFeed";
import { DayGroup } from "../../components/pages/History/DayGroup"; 
import "./HistoryPage.css"; 

interface HistoryPageProps {
    logs: DrinkLog[];
    setLogs: React.Dispatch<React.SetStateAction<DrinkLog[]>>;
    goal: number;
}

export default function HistoryPage({ logs, setLogs, goal }: HistoryPageProps) {

    const { groupedLogs, sortedDays, calendarDays } = useMemo(() => {
        const byDay: Record<string, DrinkLog[]> = {};
        logs.forEach(l => {
            const k = dayKey(l.ts);
            (byDay[k] = byDay[k] ?? []).push(l);
        });

        const sortedKeys = Object.keys(byDay).sort((a, b) =>
            new Date(b).getTime() - new Date(a).getTime()
        );
        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const now = new Date();
        const dayOfWeek = now.getDay();
        const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        const monday = new Date(new Date().setDate(diffToMonday));

        const cal = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            return { name: weekDays[d.getDay()], date: d.getDate() };
        });

        return { groupedLogs: byDay, sortedDays: sortedKeys, calendarDays: cal };
    }, [logs]);

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
        <div className="history-page-root">
            <div className="sticky-header">
                <h1 className="header-title">Today's Feed</h1>
                <p className="header-subtitle">
                    How Much Did You Drink Today?
                </p>
                <div className="calendar-container">
                    {calendarDays.map((day, i) => (
                        <div key={i} className="calendar-day-item">
                            <span className="day-name">{day.name}</span>
                            <div className="date-circle">
                                {day.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <TodayFeed logs={logs} />

            <div className="history-content-section">
                <h3 className="history-main-title">History</h3>
                {sortedDays.length === 0 ? (
                    <div className="history-empty-state">No History Yet</div>
                ) : (
                    <div className="history-list-container">
                        {sortedDays.map(day => (
                            <DayGroup
                                key={day}
                                day={day}
                                logs={groupedLogs[day]}
                                goal={goal}
                                onRemove={removeLog}
                                onClear={() => clearDay(day)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}