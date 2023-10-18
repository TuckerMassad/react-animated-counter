import React from "react";
import { AnimatedCounterProps } from "./types";
import { AnimatedCounter } from "./AnimatedCounter";

const Main = ({
  value,
  fontSize,
  color,
  incrementColor,
  decrementColor,
  includeDecimals,
}: AnimatedCounterProps) => (
  <React.Fragment>
    <AnimatedCounter
      value={value}
      fontSize={fontSize}
      color={color}
      incrementColor={incrementColor}
      decrementColor={decrementColor}
      includeDecimals={includeDecimals}
    />
  </React.Fragment>
);

export { Main as AnimatedCounter };