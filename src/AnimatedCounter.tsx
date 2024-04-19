import React, { memo, useEffect, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatForDisplay } from "./util";
import { usePrevious } from "./hooks";
import debounce from 'lodash/debounce';
import './styles.css';

export interface AnimatedCounterProps {
  value?: number;
  fontSize?: string;
  fontWeight?:string;
  padding?: string;
  color?: string;
  incrementColor?: string;
  decrementColor?: string;
  includeDecimals?: boolean;
  decimalPrecision?: number;
  includeCommas?: boolean;
  className?:string;
}

export interface NumberColumnProps {
  digit: string;
  delta: string | null;
  fontSize: string;
  fontWeight?:string;
  padding?: string;
  color: string;
  incrementColor: string;
  decrementColor: string;
  className?:string;
}

export interface DecimalColumnProps {
  fontSize: string;
  color: string;
  isComma: boolean;
  className?:string;
}

// Decimal element component
const DecimalColumn = ({ fontSize, color, className, fontWeight, padding, isComma }: DecimalColumnProps) => (
  <span
    className={className}
    style={{
      fontSize: fontSize,
      lineHeight: fontSize,
      fontWeight:fontWeight,
      padding: padding,
      color: color,
      marginLeft: `calc(-${fontSize} / 10)`,
    }}>
      {isComma ? ',' : '.'}
    </span>
);

// Individual number element component
const NumberColumn = memo(({
  digit,
  delta,
  fontSize,
  className,
  fontWeight,
  padding, 
  color,
  incrementColor,
  decrementColor,
}: NumberColumnProps) => {

  const [position, setPosition] = useState<number>(0);
  const [animationClass, setAnimationClass] = useState<string | null>(null);
  const currentDigit = +digit;
  const previousDigit = usePrevious(+currentDigit);
  const columnContainer = useRef<HTMLDivElement>(null);

  const handleAnimationComplete = useCallback(
    debounce(() => {
      setAnimationClass("");
    }, 200),
    []
  );

  const setColumnToNumber = useCallback((number: string) => {
    if (columnContainer?.current?.clientHeight) {
      setPosition(columnContainer?.current?.clientHeight * parseInt(number, 10));
    }
  }, []);

  useEffect(() => {
    setAnimationClass(previousDigit !== currentDigit ? delta : '');
  }, [digit, delta]);

  useEffect(() => {
    setColumnToNumber(digit);
  }, [digit, setColumnToNumber]);

  // If digit is negative symbol, simply return an unanimated character
  if (digit === '-') {
    return (
      <span
        className={className}
        style={{ 
          color: color,
          fontSize: fontSize,
          fontWeight:fontWeight,
          padding: padding,
          lineHeight: fontSize,
          marginRight: `calc(${fontSize} / 5)`,
        }}
      >
        {digit}
      </span>
    )
  }

  return (
    <div
      className={` ${className} ticker-column-container`}
      ref={columnContainer}
      style={{ 
        fontSize: fontSize,
        lineHeight: fontSize,
        fontWeight:fontWeight,
        padding: padding,
        height: 'auto',
        color: color,
        '--increment-color': `${incrementColor}`,
        '--decrement-color': `${decrementColor}`,
      } as React.CSSProperties}
    >
      <motion.div
        animate={{ x: 0, y: position }}
        className={`ticker-column ${animationClass}`}
        onAnimationComplete={handleAnimationComplete}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
          <div className='ticker-digit' key={num}>
            <span className={className} style={{ 
              fontSize: fontSize,
              fontWeight:fontWeight,
              padding: padding,
              lineHeight: fontSize,
            }}>
              {num}
            </span>
          </div>
        ))}
      </motion.div>
      <span className={`${className} number-placeholder`}>0</span>
    </div>
  );
}, (prevProps, nextProps) => prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta);

// Main component
const AnimatedCounter = ({
  value = 0,
  fontSize = '18px',
  className,
  fontWeight,
  padding, 
  color = 'black',
  incrementColor = '#32cd32',
  decrementColor = '#fe6862',
  includeDecimals = true,
  decimalPrecision = 2,
  includeCommas = false,
}: AnimatedCounterProps) => {

  const numArray = formatForDisplay(Math.abs(value), includeDecimals, decimalPrecision, includeCommas);
  const previousNumber = usePrevious(value);
  const isNegative = value < 0;

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
      {/* Format integer to NumberColumn components */}
      {numArray.map((number: string, index: number) =>
        number === "." || number === "," ? (
          <DecimalColumn
            key={index}
            fontSize={fontSize}
            fontWeight={fontWeight}
            padding={padding}
            color={color}
            className={className}
            isComma={number === ","}
          />
        ) : (
          <NumberColumn
            key={index}
            digit={number}
            delta={delta}
            color={color}
            className={className}
            fontWeight={fontWeight}
            padding={padding}
            fontSize={fontSize}
            incrementColor={incrementColor}
            decrementColor={decrementColor}
          />
        )
      )}
      {/* If number is negative, render '-' feedback */}
      {isNegative &&
        <NumberColumn
          key={'negative-feedback'}
          digit={'-'}
          delta={delta}
          color={color}
          className={className}
          fontWeight={fontWeight}
          padding={padding}
          fontSize={fontSize}
          incrementColor={incrementColor}
          decrementColor={decrementColor}
        />
      }
    </motion.div>
  );
}

export default AnimatedCounter;
