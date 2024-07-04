import React, { CSSProperties } from "react";
import './styles.css';
export interface AnimatedPercentProps {
    value?: number;
    fontSize?: string;
    color?: string;
    duration?: number;
    containerStyles?: CSSProperties;
    digitStyles?: CSSProperties;
}
export interface NumberColumnProps {
    digit: string;
    delta: string | null;
    fontSize: string;
    color: string;
    duration: number;
    digitStyles: CSSProperties;
}
export interface DecimalColumnProps {
    fontSize: string;
    color: string;
    isComma: boolean;
    digitStyles: CSSProperties;
}
declare const AnimatedPercent: ({ value, fontSize, color, duration, containerStyles, digitStyles, }: AnimatedPercentProps) => React.JSX.Element;
export default AnimatedPercent;
