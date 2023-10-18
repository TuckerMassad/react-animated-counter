import React, { memo, useEffect, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatForDisplay, calculateDigitWidth } from "./util";
import { usePrevious } from "./hooks";
import { AnimatedCounterProps, DecimalColumnProps, NumberColumnProps } from "../types";
import './animatedCounterStyles.css';

// Decimal element component
const DecimalColumn = ({ fontSize, color }: DecimalColumnProps) => (
  <span style={{ fontSize: fontSize, lineHeight: fontSize, color: color}}>.</span>
);

// Individual number element component
const NumberColumn = memo(({ 
  digit,
  delta,
  fontSize,
  color,
  incrementColor,
  decrementColor,
}: NumberColumnProps) => {

  const [position, setPosition] = useState<number>(0);
  const [animationClass, setAnimationClass] = useState<string | null>(null);
  const currentDigit = +digit;
  const previousDigit = usePrevious(+currentDigit);
  const columnContainer = useRef<HTMLDivElement>(null);

  const setColumnToNumber = useCallback((number: string) => {
    if (columnContainer?.current?.clientHeight) {
      setPosition(columnContainer?.current?.clientHeight * parseInt(number, 10));
    }
  }, []);

  useEffect(() => setAnimationClass(previousDigit !== currentDigit ? delta : ''), [
    digit,
    delta
  ]);

  useEffect(() => setColumnToNumber(digit), [digit, setColumnToNumber]);

  return (
    <div
      className='ticker-column-container'
      ref={columnContainer}
      style={{ 
        fontSize: fontSize,
        lineHeight: fontSize,
        color: color,
        height: 'auto',
        '--increment-color': incrementColor,
        '--decrement-color': decrementColor
      } as React.CSSProperties}
    >
      <motion.div
        animate={{ x: 0, y: position }}
        className={`ticker-column ${animationClass}`}
        onAnimationComplete={() => setAnimationClass("")}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
          <div key={num} className='ticker-digit'>
            <span style={{ 
              fontSize: fontSize,
              lineHeight: fontSize,
              color: color,
              width: calculateDigitWidth(num),
            }}>
              {num}
            </span>
          </div>
        ))}
      </motion.div>
      <span className='number-placeholder'>0</span>
    </div>
  );
}, (prevProps, nextProps) => prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta);

// Main component
const AnimatedCounter = ({
  value = 0,
  fontSize = '18px',
  color = 'black',
  incrementColor = '#32cd32',
  decrementColor = '#fe6862',
  includeDecimals = true,
}: AnimatedCounterProps) => {

  const numArray = formatForDisplay(value, includeDecimals);
  const previousNumber = usePrevious(value);
  let delta: string | null = null;

  if (previousNumber !== null) {
    if (value > previousNumber) {
      delta = 'increase';
    } else if (value < previousNumber) {
      delta = 'decrease';
    }
  }

  return (
    <motion.div layout className='ticker-view'>
      {numArray.map((number: string, index: number) =>
        number === "." ? (
          <DecimalColumn
            key={index}
            fontSize={fontSize}
            color={color}
          />
        ) : (
          <NumberColumn
            key={index}
            digit={number}
            delta={delta}
            color={color}
            fontSize={fontSize}
            incrementColor={incrementColor}
            decrementColor={decrementColor}
            includeDecimals={includeDecimals}
          />
        )
      )}
    </motion.div>
  );
}

export default AnimatedCounter;