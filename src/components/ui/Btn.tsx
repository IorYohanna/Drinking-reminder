import type { CSSProperties, ReactNode } from "react";
import type { BtnVariant } from "../../type/types";

export const Btn = ({ children, onClick, className = "", variant = "primary", style = {} }: { children: ReactNode; onClick?: () => void; className?: string; variant?: BtnVariant; style?: CSSProperties }) => {
  const vs: Record<BtnVariant, string> = {
    primary:   "bg-p-green text-white shadow-[3px_3px_0_#1a1714]",
    secondary: "bg-p-paper text-p-ink shadow-[3px_3px_0_#1a1714]",
    ghost:     "bg-transparent text-p-ink shadow-none border-2 border-p-ink",
  };
  return (
    <button
      onClick={onClick}
      style={{ filter: "url(#sk)", ...style }}
      className={`border-[2.5px] border-p-ink rounded-[10px] font-caveat 
        font-bold cursor-pointer transition-all duration-75 px-4.5 
        py-2.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#1a1714] ${vs[variant]} ${className}`}
    >
      {children}
    </button>
  );
};