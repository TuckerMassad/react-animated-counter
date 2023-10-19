import React from "react";
import { AnimatedCounterProps } from "./types";
import './animatedCounterStyles.css';
declare const AnimatedCounter: ({ value, fontSize, color, incrementColor, decrementColor, includeDecimals, }: AnimatedCounterProps) => React.JSX.Element;
export default AnimatedCounter;
