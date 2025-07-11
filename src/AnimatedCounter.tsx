import React, { memo, useEffect, useCallback, useRef, useState, CSSProperties, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { formatForDisplay } from "./util";
import { usePrevious } from "./hooks";
import debounce from 'lodash/debounce';
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
  containerStyles?: CSSProperties;
  digitStyles?: CSSProperties;
  animateInitialValue?: boolean;
}

export interface NumberColumnProps {
  digit: string;
  delta: string | null;
  fontSize: string;
  color: string;
  incrementColor: string;
  decrementColor: string;
  digitStyles: CSSProperties;
}

export interface DecimalColumnProps {
  fontSize: string;
  color: string;
  isComma: boolean;
  digitStyles: CSSProperties;
}

// Decimal element component
const DecimalColumn = ({ fontSize, color, isComma, digitStyles }: DecimalColumnProps) => (
  <span
    style={{
      fontSize: fontSize,
      lineHeight: fontSize,
      color: color,
      marginLeft: `calc(-${fontSize} / 10)`,
      ...digitStyles,
    }}>
      {isComma ? ',' : '.'}
    </span>
);

// Individual number element component
const NumberColumn = memo(({
  digit,
  delta,
  fontSize,
  color,
  incrementColor,
  decrementColor,
  digitStyles,
  animateInitialValue = true,
}: NumberColumnProps & { animateInitialValue?: boolean }) => {

  const [position, setPosition] = useState<number>(0);
  const [animationClass, setAnimationClass] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const currentDigit = +digit;
  const previousDigit = usePrevious(+currentDigit);
  const columnContainer = useRef<HTMLDivElement>(null);

  const handleAnimationComplete = useCallback(
    debounce(() => {
      setAnimationClass("");
    }, 200),
    []
  );

  const setColumnToNumber = useCallback((number: string, animate: boolean = true) => {
    if (columnContainer?.current?.clientHeight) {
      const newPosition = columnContainer.current.clientHeight * parseInt(number, 10);
      setPosition(newPosition);
    }
  }, []);

  useLayoutEffect(() => {
    if (!isInitialized && columnContainer?.current?.clientHeight) {
      setColumnToNumber(digit, animateInitialValue);
      setIsInitialized(true);
    }
  }, [digit, setColumnToNumber, isInitialized, animateInitialValue]);

  useEffect(() => {
    if (isInitialized) {
      setAnimationClass(previousDigit !== currentDigit ? delta : '');
    }
  }, [digit, delta, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      setColumnToNumber(digit);
    }
  }, [digit, setColumnToNumber, isInitialized]);

  // If digit is negative symbol, simply return an unanimated character
  if (digit === '-') {
    return (
      <span
        style={{ 
          color: color,
          fontSize: fontSize,
          lineHeight: fontSize,
          marginRight: `calc(${fontSize} / 5)`,
          ...digitStyles
        }}
      >
        {digit}
      </span>
    )
  }

  return (
    <div
      className='ticker-column-container'
      ref={columnContainer}
      style={{ 
        fontSize: fontSize,
        lineHeight: fontSize,
        height: 'auto',
        color: color,
        '--increment-color': `${incrementColor}`,
        '--decrement-color': `${decrementColor}`,
        ...digitStyles,
      } as React.CSSProperties}
    >
      <motion.div
        animate={{ x: 0, y: position }}
        className={`ticker-column ${animationClass}`}
        onAnimationComplete={handleAnimationComplete}
        initial={animateInitialValue ? { x: 0, y: 0 } : { x: 0, y: position }}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
          <div className='ticker-digit' key={num}>
            <span style={{ 
              fontSize: fontSize,
              lineHeight: fontSize,
              ...digitStyles,
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
  decimalPrecision = 2,
  includeCommas = false,
  containerStyles = {},
  digitStyles = {}, 
  animateInitialValue = false,
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
    <motion.div
      layout
      className='ticker-view'
      style={{ ...containerStyles }}
    >
      {/* Format integer to NumberColumn components */}
      {numArray.map((number: string, index: number) =>
        number === "." || number === "," ? (
          <DecimalColumn
            key={index}
            fontSize={fontSize}
            color={color}
            isComma={number === ","}
            digitStyles={digitStyles}
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
            digitStyles={digitStyles}
            animateInitialValue={animateInitialValue}
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
          fontSize={fontSize}
          incrementColor={incrementColor}
          decrementColor={decrementColor}
          digitStyles={digitStyles}
          animateInitialValue={animateInitialValue}
        />
      }
    </motion.div>
  );
}

export default AnimatedCounter;