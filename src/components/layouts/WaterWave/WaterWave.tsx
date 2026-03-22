import { P } from "../../../utils/constants"; 

export const WaterWave = ({ pct }: { pct: number }) => {
  const fillPct = Math.min(100, Math.max(0, pct));
  
  return (
    <div className="absolute inset-2.5 rounded-full overflow-hidden bg-[#F5F0E8]">
      <div 
        className="absolute left-[-50%] w-[200%] h-[200%] transition-transform duration-1000 ease-in-out"
        style={{
          top: `${100 - fillPct}%`,
          borderRadius: '40%',
          backgroundColor: `${P.lightBlue}80`,
          animation: 'wave 5s infinite linear'
        }}
      />
    </div>
  );
};