import { Card } from "../../../ui/Card"; 

interface SummaryCardsProps {
  stats: {
    todayLogs: any[];
    totalL: number;
  };
  goal: number;
}

export const SummaryCards = ({ stats, goal }: SummaryCardsProps) => {
  const lastLog = stats.todayLogs[0];
  const minutesAgo = lastLog 
    ? Math.round((Date.now() - lastLog.ts) / 60000) 
    : null;

  const items = [
    { label: "Drinks",    val: stats.todayLogs.length,              unit: "today" },
    { label: "Remaining", val: `${Math.max(0, +(goal - stats.totalL).toFixed(2))}L`, unit: "to go" },
    { label: "Last",      val: minutesAgo !== null ? `${minutesAgo}m` : "—", unit: "ago" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {items.map(s => (
        <Card key={s.label} className="text-center py-2.5 px-1.5">
          <div className="font-caveat text-[26px] font-bold text-p-green">{s.val}</div>
          <div className="font-caveat text-[13px] text-p-muted">{s.unit}</div>
          <div className="font-caveat text-[11px] text-p-ink/50 uppercase tracking-tighter">{s.label}</div>
        </Card>
      ))}
    </div>
  );
};