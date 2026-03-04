import { P } from "../../../utils/constants";
import "./WaterWave.css";

export const WaterWave = ({ pct }: { pct: number }) => {
  const h = 240, w = 240;
  const fill = Math.max(0, Math.min(100, pct));
  const y = h * (1 - fill / 100);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="absolute bottom-0 left-0">
      <defs><clipPath id="cc"><circle cx={120} cy={120} r={118} /></clipPath></defs>
      <g clipPath="url(#cc)">
        <path d={`M0,${y} C40,${y - 15} 80,${y + 15} 120,${y} C160,${y - 15} 200,${y + 15} 240,${y} L240,${h} L0,${h} Z`} fill={P.water} opacity="0.35" style={{ filter: "url(#sk)" }} />
        <path d={`M0,${y + 8} C50,${y - 10} 90,${y + 18} 140,${y + 5} C180,${y - 8} 210,${y + 12} 240,${y + 8} L240,${h} L0,${h} Z`} fill={P.green} opacity="0.7" style={{ filter: "url(#sk)" }} />
      </g>
    </svg>
  );
};
