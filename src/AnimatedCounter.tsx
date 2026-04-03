import './styles.css';
import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  useMemo,
} from 'react';
import { formatForDisplay, shallowStyleEqual } from './util';
import { usePrevious, useSpringColumnTransform } from './hooks';

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

// Array of digits to vertically scroll through
const DIGIT_ARRAY = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

// Decimal element component
const DecimalColumn = memo(({ fontSize, color, isComma, digitStyles }: DecimalColumnProps) => {
  const decimalStyle = useMemo(() => ({
    fontSize: fontSize,
    lineHeight: fontSize,
    color: color,
    marginLeft: `calc(-${fontSize} / 10)`,
    ...digitStyles,
  }), [fontSize, color, digitStyles]);

  return (
    <span style={decimalStyle}>
      {isComma ? ',' : '.'}
    </span>
  );
});

// Individual number element component
const NumberColumn = memo(({
  digit,
  delta,
  fontSize,
  color,
  incrementColor,
  decrementColor,
  digitStyles,
}: NumberColumnProps) => {

  const fontSizeValue = parseFloat(fontSize.replace('px', ''));
  const digitValue = parseInt(digit, 10);
  const [animationClass, setAnimationClass] = useState<string | null>(null);
  const currentDigit = +digit;
  const previousDigit = usePrevious(+currentDigit);
  const hasHydrated = useRef<boolean>(false);

  const clearAnimationClass = useCallback(() => {
    setAnimationClass('');
  }, []);

  const targetY = useMemo(() => {
    if (Number.isNaN(digitValue) || Number.isNaN(fontSizeValue)) return 0;
    return fontSizeValue * digitValue;
  }, [digitValue, fontSizeValue]);

  const { ref: columnRef, ssrTransformStyle } = useSpringColumnTransform(targetY, {
    onSettled: clearAnimationClass,
  });

  const containerStyle = useMemo(() => ({
    fontSize: fontSize,
    lineHeight: fontSize,
    height: 'auto' as const,
    color: color,
    '--increment-color': `${incrementColor}`,
    '--decrement-color': `${decrementColor}`,
    ...digitStyles,
  } as React.CSSProperties), [fontSize, color, incrementColor, decrementColor, digitStyles]);

  const digitSpanStyle = useMemo(() => ({
    fontSize: fontSize,
    lineHeight: fontSize,
    ...digitStyles,
  }), [fontSize, digitStyles]);

  const negativeStyle = useMemo(() => ({
    color: color,
    fontSize: fontSize,
    lineHeight: fontSize,
    marginRight: `calc(${fontSize} / 5)`,
    ...digitStyles
  }), [color, fontSize, digitStyles]);

  useEffect(() => {
    if (!hasHydrated.current) {
      hasHydrated.current = true;
      return;
    }
    setAnimationClass(previousDigit !== currentDigit ? delta : '');
  }, [digit, delta]);

  // If digit is negative symbol, simply return an unanimated character
  if (digit === '-') {
    return (
      <span style={negativeStyle}>
        {digit}
      </span>
    )
  }

  const columnClassName = ['ticker-column', animationClass].filter(Boolean).join(' ');

  return (
    <div className='ticker-column-container' style={containerStyle}>
      <div ref={columnRef} className={columnClassName} style={ssrTransformStyle}>
        {DIGIT_ARRAY.map((num) => (
          <div className='ticker-digit' key={num}>
            <span style={digitSpanStyle}>
              {num}
            </span>
          </div>
        ))}
      </div>
      <span className='number-placeholder'>0</span>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.digit === nextProps.digit &&
    prevProps.delta === nextProps.delta &&
    prevProps.fontSize === nextProps.fontSize &&
    prevProps.color === nextProps.color &&
    prevProps.incrementColor === nextProps.incrementColor &&
    prevProps.decrementColor === nextProps.decrementColor &&
    shallowStyleEqual(prevProps.digitStyles, nextProps.digitStyles)
  );
});

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
}: AnimatedCounterProps) => {

  const numArray = useMemo(() => 
    formatForDisplay(Math.abs(value), includeDecimals, decimalPrecision, includeCommas),
    [value, includeDecimals, decimalPrecision, includeCommas]
  );

  const previousNumber = usePrevious(value);
  const isNegative = value < 0;

  const delta = useMemo((): string | null => {
    if (previousNumber !== null) {
      if (value > previousNumber) {
        return 'increase';
      } else if (value < previousNumber) {
        return 'decrease';
      }
    }
    return null;
  }, [value, previousNumber]);

  return (
    <div className='ticker-view' style={containerStyles}>
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
        />
      }
    </div>
  );
}

export default React.memo(AnimatedCounter);