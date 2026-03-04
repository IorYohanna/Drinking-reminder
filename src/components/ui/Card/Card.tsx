import type { CSSProperties, ReactNode } from "react";
import "./Card.css";

interface CardProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
}

export const Card = ({ children, className = "", style = {}, onClick }: CardProps) => {
    const interactionClass = onClick ? "card-interactive" : "card-static";

    return (
        <div
            onClick={onClick}
            style={style}
            className={`card-container ${interactionClass} ${className}`}
        >
            {children}
        </div>
    );
};