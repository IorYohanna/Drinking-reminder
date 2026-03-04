import type { CSSProperties, ReactNode } from "react";

export const Card = ({ children, className = "", style = {}, onClick }: { children: ReactNode; className?: string; style?: CSSProperties; onClick?: () => void }) => (
  <div
    onClick={onClick}
    style={{ filter: "url(#sk)", ...style }}
    className={`bg-p-paper border-[2.5px] border-p-ink rounded-lg py-3.5 px-4 ${onClick ? 'cursor-pointer' : 'cursor-default'} ${className}`}
  >
    {children}
  </div>
);