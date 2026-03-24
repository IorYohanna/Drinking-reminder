import { useMemo } from "react";
import type { DrinkLog } from "../../../../type/types";
import { dayKey } from "../../../../utils/utils";

interface TodayFeedProps {
    logs: DrinkLog[];
}

export const TodayFeed = ({ logs }: TodayFeedProps) => {
    const { stats } = useMemo(() => {
        const now = new Date();
        const todayStr = dayKey(now.getTime());
        const todayLogs = logs.filter((l) => dayKey(l.ts) === todayStr);
        const totalMl = todayLogs.reduce((s, l) => s + l.ml, 0);
        const isSmall = (l: DrinkLog) => l.ml === 150;
        const isMedium = (l: DrinkLog) => l.ml >= 250 && l.ml <= 450;
        const isLarge = (l: DrinkLog) => l.ml === 500;
        const calculatePct = (filterFn: (l: DrinkLog) => boolean) => {
            const sum = todayLogs.filter(filterFn).reduce((s, l) => s + l.ml, 0);
            return totalMl > 0 ? Math.round((sum / totalMl) * 100) : 0;
        };

        const isCustom = (l: DrinkLog) => !isSmall(l) && !isMedium(l) && !isLarge(l);

        const drinkStats = [
            {
                label: "Small",
                percent: calculatePct(isSmall),
                color: "bg-[#CFE3F1]"
            },
            {
                label: "Medium",
                percent: calculatePct(isMedium),
                color: "bg-[#84C1F8]"
            },
            {
                label: "Large",
                percent: calculatePct(isLarge),
                color: "bg-[#5F86A6]"
            },
            {
                label: "Custom",
                percent: calculatePct(isCustom),
                color: "bg-[#F4B860]"
            },
        ];

        return {
            stats: drinkStats,
            totalToday: (totalMl / 1000).toFixed(1),
        };
    }, [logs]);

    return (
        <div className="px-8 mt-5 no-drag">
            <h2 className="font-[Bungee] text-[#2D466E] text-2xl leading-7.25 w-48 mb-5 uppercase">
                Your Drink Progress
            </h2>

            <div className="flex justify-between items-end h-75 mb-4">
                {stats.map((item, i) => (
                    <div key={i} className="flex flex-col items-center w-16">
                        <div className="w-full bg-[#EBEBEB] h-65 rounded-full relative overflow-hidden flex flex-col justify-end">
                            <div
                                style={{ height: `${item.percent}%` }}
                                className={`${item.color} w-full rounded-t-full flex items-start justify-center pt-4 transition-all duration-700`}
                            >
                                <span className={`text-[12px] font-novaSquare font-bold ${item.label === "Custom" ? "text-[#F5F0E8]" : "text-white"}`}>
                                    {item.percent}%
                                </span>
                            </div>
                        </div>
                        <span className="text-[#1E1E1E] font-novaSquare text-[12px] mt-4">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};