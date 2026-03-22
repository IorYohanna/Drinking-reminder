import { P } from "../../../utils/constants"; 
import { WaterWave } from "../WaterWave"; 
import "./CircleProgress.css";

interface CircleProgressProps {
    pct: number;
    total: number;
    current: number;
    onGoalClick: () => void;
}

export const CircleProgress = ({ pct, total, current, onGoalClick }: CircleProgressProps) => {
    const r = 120; 
    const circ = 2 * Math.PI * r;
    const dash = (Math.min(pct, 100) / 100) * circ;

    return (
        <div className="circle-progress-container">
            <WaterWave pct={pct} />

            <svg width="260" height="260" className="absolute top-0 left-0 pointer-events-none transform -rotate-90 z-0">
                <circle
                    cx="130" cy="130" r={r}
                    className="circle-bg"
                />
                <circle
                    cx="130" cy="130" r={r}
                    stroke={P.lightBlue}
                    className="circle-indicator"
                    style={{
                        strokeDasharray: `${dash} ${circ}`,
                    }}
                />
            </svg>

            <div className="relative z-10 flex flex-col items-center text-center mt-2">
                <p className="text-black text-[22px] font-bold mb-1">{pct}%</p>
                
                <img
                    src="/src/assets/jauge.png"
                    className="w-21.25 h-31.75 object-contain drop-shadow-md"
                    alt="bottle"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                
                <button 
                    onClick={onGoalClick} 
                    className="text-black text-[20px] mt-1 font-bold hover:scale-105 transition-transform cursor-pointer"
                >
                    {current}L / {total}L
                </button>
            </div>
        </div>
    );
};