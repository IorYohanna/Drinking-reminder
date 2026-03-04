import { P } from "../utils/constants";

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

export const CircleProgress = ({ pct, total, current }: { pct: number; total: number; current: number }) => {
  const r = 108, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center w-[240px] h-[240px]">
      <svg width="240" height="240" className="absolute top-0 left-0">
        <circle cx="120" cy="120" r={r} fill="none" stroke="#e4d4bf" strokeWidth="6" strokeDasharray="8 4" />
        <circle cx="120" cy="120" r={r} fill="none" stroke={P.green} strokeWidth="7" strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={circ / 4} strokeLinecap="round" style={{ filter: "url(#sk)" }} className="transition-[stroke-dasharray] duration-600 ease-in-out" />
      </svg>
      <WaterWave pct={pct} />
      <div className="w-[236px] h-[236px] rounded-full border-[3px] border-p-ink absolute pointer-events-none" style={{ filter: "url(#sk2)" }} />
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="font-caveat text-[42px] font-bold text-white leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">{pct}%</span>
        <span className="font-caveat text-[22px] text-white/80 mt-0.5">{current}L / {total}L</span>
        <span className="font-caveat text-base text-white/60">today</span>
      </div>
    </div>
  );
};