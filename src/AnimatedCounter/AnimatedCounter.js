import React, { memo, useEffect, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrevious } from "./hooks";
import './animatedCounterStyles.css';

// Adjusts width of individual narrow digits 
const calculateDigitWidth = (digit) => {
  switch (digit) {
    case '1':
      return '50%'
    case '7':
      return '80%'
    default:
      return '100%'
  }
}

// Creates array of digits to vertically scroll through
const formatForDisplay = (number, includeDecimals) => {
  return parseFloat(Math.max(number, 0)).toFixed(includeDecimals ? 2 : 0).split('').reverse();
}

// Render decimals
const DecimalColumn = ({ fontSize, color }) => (<span style={{ fontSize: fontSize, lineHeight: fontSize, color: color}}>.</span>);

// Render an individual number
const NumberColumn = memo(({ 
  digit,
  delta,
  fontSize,
  color,
  incrementColor,
  decrementColor,
}) => {

  const [position, setPosition] = useState(0);
  const [animationClass, setAnimationClass] = useState(null);
  const previousDigit = usePrevious(digit);
  const columnContainer = useRef(null);

  const setColumnToNumber = useCallback((number) => {
    setPosition(columnContainer.current.clientHeight * parseInt(number, 10));
  }, []);

  useEffect(() => setAnimationClass(previousDigit !== digit ? delta : ''), [
    digit,
    delta
  ]);

  useEffect(() => setColumnToNumber(digit), [digit, setColumnToNumber]);

  return (
    <div
      className="ticker-column-container"
      ref={columnContainer}
      style={{ 
        fontSize: fontSize,
        lineHeight: fontSize,
        color: color,
        height: 'auto',
        '--increment-color': incrementColor,
        '--decrement-color': decrementColor
      }}
    >
      <motion.div
        animate={{ x: 0, y: position }}
        className={`ticker-column ${animationClass}`}
        onAnimationComplete={() => setAnimationClass("")}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
          <div key={num} className="ticker-digit">
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
      <span className="number-placeholder">0</span>
    </div>
  );
}, (prevProps, nextProps) => prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta);

// Main component
const AnimatedCounter = ({
  value,
  fontSize,
  color,
  incrementColor,
  decrementColor,
  includeDecimals,
}) => {
  const numArray = formatForDisplay(value, includeDecimals);
  const previousNumber = usePrevious(value);

  let delta = null;
  if (value > previousNumber) delta = 'increase';
  if (value < previousNumber) delta = 'decrease';

  return (
    <motion.div layout className='ticker-view'>
      {numArray.map((number, index) =>
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