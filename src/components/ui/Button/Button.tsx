import type { CSSProperties, ReactNode } from "react";
import type { BtnVariant } from "../../../type/types";
import "./Button.css";

interface BtnProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: BtnVariant;
    style?: CSSProperties;
}

export const Btn = ({
    children,
    onClick,
    className = "",
    variant = "primary",
    style = {}
}: BtnProps) => {

    const variantStyles: Record<BtnVariant, string> = {
        primary: "bg-p-green text-white btn-shadow-standard",
        secondary: "bg-p-paper text-p-ink btn-shadow-standard",
        ghost: "btn-ghost",
    };

    return (
        <button
            onClick={onClick}
            style={style}
            className={`btn-base ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    );
};