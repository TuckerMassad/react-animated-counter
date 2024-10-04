import React, { CSSProperties } from "react";
import "./styles.css";
export interface AnimatedPercentProps {
    color?: string;
    containerStyles?: CSSProperties;
    decimalPrecision?: number;
    digitStyles?: CSSProperties;
    duration?: number;
    fontSize?: string;
    includeCommas?: boolean;
    includeDecimals?: boolean;
    value?: number;
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
declare const AnimatedPercent: ({ color, containerStyles, decimalPrecision, digitStyles, duration, fontSize, includeCommas, includeDecimals, value, }: AnimatedPercentProps) => React.JSX.Element;
export default AnimatedPercent;
