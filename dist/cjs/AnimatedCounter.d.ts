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
}
declare const AnimatedCounter: ({ value, fontSize, color, incrementColor, decrementColor, includeDecimals, decimalPrecision, }: AnimatedCounterProps) => React.JSX.Element;
export default AnimatedCounter;
