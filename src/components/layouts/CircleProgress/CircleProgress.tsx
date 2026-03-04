import { P } from "../../../utils/constants";
import { WaterWave } from "../WaterWave";
import "./CircleProgress.css";

interface CircleProgressProps {
    pct: number;
    total: number;
    current: number;
}

export const CircleProgress = ({ pct, total, current }: CircleProgressProps) => {
    const r = 108;
    const circ = 2 * Math.PI * r;
    const dash = (pct / 100) * circ;

    return (
        <div className="circle-progress-container">
            <svg width="240" height="240" className="absolute top-0 left-0">
                <circle
                    cx="120" cy="120" r={r}
                    className="circle-bg"
                />
                <circle
                    cx="120" cy="120" r={r}
                    stroke={P.green}
                    className="circle-indicator"
                    style={{
                        strokeDasharray: `${dash} ${circ - dash}`,
                        strokeDashoffset: circ / 4
                    }}
                />
            </svg>

            <WaterWave pct={pct} />

            <div className="circle-inner-border" />

            <div className="relative z-10 flex flex-col items-center text-center">
                <span className="progress-text-pct">{pct}%</span>
                <span className="progress-text-sub">{current}L / {total}L</span>
                <span className="progress-text-label">today</span>
            </div>
        </div>
    );
};