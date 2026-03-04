import type { DrinkLog } from "../type/types";
import { KEYS, P, DRINK_TYPES } from "../utils/constants";
import { save, dayKey } from "../utils/utils";
import { Card } from "../components/ui/Card";

interface Props { logs: DrinkLog[]; setLogs: React.Dispatch<React.SetStateAction<DrinkLog[]>>; goal: number; }

export default function HistoryPage({ logs, setLogs, goal }: Props) {
  const byDay: Record<string, DrinkLog[]> = {};
  logs.forEach(l => { const k = dayKey(l.ts); (byDay[k] = byDay[k] ??[]).push(l); });
  const days = Object.keys(byDay).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const weekDays =["S", "M", "T", "W", "T", "F", "S"];
  const now = new Date();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now); d.setDate(now.getDate() - 6 + i);
    const key = d.toDateString();
    const total = (byDay[key] ??[]).reduce((s, l) => s + l.ml, 0);
    return { day: weekDays[d.getDay()], total, isToday: i === 6, met: total >= goal * 1000 };
  });
  const maxBar = Math.max(...last7.map(d => d.total), 500);

  const removeLog = (id: number) => { const next = logs.filter(x => x.id !== id); setLogs(next); save(KEYS.logs, next); };
  const clearDay = (dayStr: string) => { const next = logs.filter(l => dayKey(l.ts) !== dayStr); setLogs(next); save(KEYS.logs, next); };

  return (
    <div className="flex flex-col gap-3.5 p-4 pb-6">
      <h2 className="font-caveat text-[32px] font-bold text-p-ink">History 📅</h2>
      <Card>
        <p className="font-caveat text-[17px] text-p-muted mb-2.5">Last 7 days</p>
        <div className="flex justify-between items-end gap-1 h-25">
          {last7.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="font-caveat text-[11px] text-p-muted">{d.total > 0 ? `${(d.total / 1000).toFixed(1)}` : ""}</span>
              <div className="w-full min-h-1.5 border-2 border-p-ink rounded filter-[url(#sk)] transition-all duration-400" style={{ height: (d.total / maxBar) * 68 + 4, backgroundColor: d.isToday ? P.green : d.met ? P.water : d.total > 0 ? "#c8e6f5" : "#e8e0d4", filter: "url(#sk)" }} />
              <span className={`font-caveat text-[13px] ${d.isToday ? 'text-p-green font-bold' : 'text-p-muted font-normal'}`}>{d.day}</span>
            </div>
          ))}
        </div>
      </Card>

      {days.length === 0 && <div className="text-center py-12 font-caveat text-[22px] text-p-muted">No logs yet! 💧</div>}

      {days.map(day => {
        const dl = byDay[day];
        const totalMl = dl.reduce((s, l) => s + l.ml, 0);
        const met = totalMl >= goal * 1000;
        return (
          <div key={day}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-caveat text-[19px] font-bold text-p-ink">{met ? "✅ " : ""}{new Date(day).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
              <div className="flex items-center gap-2">
                <span className={`font-caveat text-lg ${met ? 'text-p-green' : 'text-p-muted'}`}>{(totalMl / 1000).toFixed(2)}L</span>
                <button onClick={() => { if (window.confirm("Delete all entries for this day?")) clearDay(day); }} className="bg-none border-none cursor-pointer text-base text-p-muted">🗑️</button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              {dl.map(l => {
                const dt = DRINK_TYPES.find(d => d.id === l.type) ?? DRINK_TYPES[0];
                return (
                  <Card key={l.id} className="flex justify-between items-center py-2 px-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{dt.icon}</span><span className="font-caveat text-[17px] text-p-ink">{l.ml}ml — {dt.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-caveat text-sm text-p-muted">{new Date(l.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      <button onClick={() => removeLog(l.id)} className="bg-none border-none cursor-pointer text-base text-p-muted">✕</button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}