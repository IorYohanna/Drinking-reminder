import "./SummyCards.css";

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

  const remainingL = Math.max(0, +(goal - stats.totalL).toFixed(2));

  const items =[
    { 
      val: stats.todayLogs.length, 
      line2: "today", 
      line3: "Drinks", 
      img: "/src/assets/water1.png",
      imgClass: "-top-[40px] w-[55px]" 
    },
    { 
      val: `${remainingL}L`, 
      line2: "to go", 
      line3: "Remaining", 
      img: "/src/assets/water2.png",
      imgClass: "-top-[20px] w-[50px]" 
    },
    { 
      val: minutesAgo !== null ? `${minutesAgo}m` : "0m", 
      line2: "ago", 
      line3: "Last Log", 
      img: "/src/assets/water3.png",
      imgClass: "-top-[15px] w-[55px]" 
    },
  ];

  return (
    <div className="summary-container">
      {items.map((item, index) => (
        <div key={index} className="summary-card">
          <img 
            src={item.img} 
            className={`summary-img-base ${item.imgClass}`} 
            alt={item.line3} 
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          <p className="summary-text">
            {item.val}<br />
            {item.line2}<br />
            {item.line3}
          </p>
        </div>
      ))}
    </div>
  );
};