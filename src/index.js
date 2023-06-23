import React from "react";
import { AnimatedCounter } from "./AnimatedCounter";

const Main = ({
  value = 0,
  fontSize = '18px',
  color = 'black',
  incrementColor = '#32cd32',
  decrementColor = '#fe6862',
  includeDecimals = true,
}) => (
  <>
    <AnimatedCounter
      value={value}
      fontSize={fontSize}
      color={color}
      incrementColor={incrementColor}
      decrementColor={decrementColor}
      includeDecimals={includeDecimals}
    />
  </>
);

export { Main as AnimatedCounter };