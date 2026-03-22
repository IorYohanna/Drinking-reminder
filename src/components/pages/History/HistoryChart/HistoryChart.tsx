import { P } from "../../../../utils/constants"; 
import { Card } from "../../../ui/Card";

interface ChartStat {
  day: string;
  total: number;
  isToday: boolean;
  met: boolean;
}

export const HistoryChart = ({ data }: { data: ChartStat[], goal: number }) => {
  const maxBar = Math.max(...data.map(d => d.total), 500);

  return (
    <Card className="p-4">
      <p className="text-[17px] mb-2.5">Last 7 days</p>
      <div className="flex justify-between items-end gap-1 h-25">
        {data.map((d, i) => {
          const height = (d.total / maxBar) * 68 + 4;
          
          const barColor = d.isToday ? P.green : d.met ? P.water : d.total > 0 ? "#c8e6f5" : "#e8e0d4";

          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[11px]">
                {d.total > 0 ? (d.total / 1000).toFixed(1) : ""}
              </span>
              <div 
                className="w-full min-h-1.5 border-2 rounded transition-all duration-400" 
                style={{ height, backgroundColor: barColor, filter: "url(#sk)" }} 
              />
              <span className={`text-[13px] ${d.isToday ? 'font-bold' : ''}`}>
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};