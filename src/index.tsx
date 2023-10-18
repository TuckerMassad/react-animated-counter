import React from "react";
import { AnimatedCounterProps } from "./types";
import { AnimatedCounter as AnimatedCounterWrapper } from "./AnimatedCounter";

const AnimatedCounter = ({
  value,
  fontSize,
  color,
  incrementColor,
  decrementColor,
  includeDecimals,
}: AnimatedCounterProps) => (
  <React.Fragment>
    <AnimatedCounterWrapper
      value={value}
      fontSize={fontSize}
      color={color}
      incrementColor={incrementColor}
      decrementColor={decrementColor}
      includeDecimals={includeDecimals}
    />
  </React.Fragment>
);

export default AnimatedCounter;