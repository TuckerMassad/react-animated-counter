import React from "react";
import './styles.css';
export interface AnimatedCounterProps {
    value?: number;
    fontSize?: string;
    color?: string;
    incrementColor?: string;
    decrementColor?: string;
    includeDecimals?: boolean;
    decimalPrecision?: number;
    includeCommas?: boolean;
}
export interface NumberColumnProps {
    digit: string;
    delta: string | null;
    fontSize: string;
    color: string;
    incrementColor: string;
    decrementColor: string;
}
export interface DecimalColumnProps {
    fontSize: string;
    color: string;
    isComma: boolean;
}
declare const AnimatedCounter: ({ value, fontSize, color, incrementColor, decrementColor, includeDecimals, decimalPrecision, includeCommas, }: AnimatedCounterProps) => React.JSX.Element;
export default AnimatedCounter;
