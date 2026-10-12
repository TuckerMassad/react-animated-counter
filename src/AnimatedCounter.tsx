import './styles.css';
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
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

const BARE_NUMBER = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;
const EMPTY_DIGIT_STYLES: CSSProperties = {};

// A unitless fontSize used to mean pixels. Lengths such as rem, em, and vh
// are passed through so 1em in the slot matches that computed size.
const normalizeFontSize = (fontSize: string): string => {
  const trimmed = fontSize.trim();
  return BARE_NUMBER.test(trimmed) ? `${trimmed}px` : trimmed;
};

// Decimal element component
const DecimalColumn = memo(({ fontSize, color, isComma, digitStyles }: DecimalColumnProps) => {
  const decimalStyle = useMemo(() => ({
    fontSize: fontSize,
    lineHeight: 1,
    height: '1em',
    color: color,
    marginLeft: `calc(-${fontSize} / 10)`,
    ...digitStyles,
  }), [fontSize, color, digitStyles]);

  return (
    <span style={decimalStyle} aria-hidden="true">
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

  const digitValue = parseInt(digit, 10);
  const [animationClass, setAnimationClass] = useState<string | null>(null);
  const hasHydrated = useRef<boolean>(false);

  const clearAnimationClass = useCallback(() => {
    setAnimationClass('');
  }, []);

  const targetSlot = Number.isNaN(digitValue) ? 0 : digitValue;

  const columnClassName = ['ticker-column', animationClass].filter(Boolean).join(' ');

  const { ref: columnRef, ssrTransformStyle } = useSpringColumnTransform(targetSlot, {
    onSettled: clearAnimationClass,
    layoutClassName: columnClassName,
  });

  const containerStyle = useMemo(() => ({
    fontSize: fontSize,
    lineHeight: 1,
    color: color,
    '--increment-color': `${incrementColor}`,
    '--decrement-color': `${decrementColor}`,
    ...digitStyles,
  } as React.CSSProperties), [fontSize, color, incrementColor, decrementColor, digitStyles]);

  const digitSpanStyle = useMemo(() => ({
    fontSize: fontSize,
    lineHeight: 1,
    ...digitStyles,
  }), [fontSize, digitStyles]);

  const negativeStyle = useMemo(() => ({
    color: color,
    fontSize: fontSize,
    lineHeight: 1,
    height: '1em',
    marginRight: `calc(${fontSize} / 5)`,
    ...digitStyles
  }), [color, fontSize, digitStyles]);

  useEffect(() => {
    if (!hasHydrated.current) {
      hasHydrated.current = true;
      return;
    }
    setAnimationClass(delta != null ? delta : '');
  }, [digit, delta]);

  // If digit is negative symbol, simply return an unanimated character
  if (digit === '-') {
    return (
      <span style={negativeStyle} aria-hidden="true">
        {digit}
      </span>
    )
  }

  return (
    <div className='ticker-column-container' style={containerStyle} aria-hidden="true">
      <div ref={columnRef} className={columnClassName} style={ssrTransformStyle}>
        {DIGIT_ARRAY.map((num) => (
          <div
            className='ticker-digit'
            key={num}
            style={{ '--digit': num } as React.CSSProperties}
          >
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
  containerStyles = EMPTY_DIGIT_STYLES,
  digitStyles = EMPTY_DIGIT_STYLES,
}: AnimatedCounterProps) => {
  const resolvedFontSize = normalizeFontSize(fontSize);

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

  const prevNumArrayRef = useRef<string[] | undefined>(undefined);
  const prevFormattedDigits = prevNumArrayRef.current;
  const pulseDeltaAtIndex = numArray.map((ch, i) => {
    if (ch === '.' || ch === ',') {
      return null;
    }
    if (prevFormattedDigits == null) {
      return delta;
    }
    return prevFormattedDigits[i] !== ch ? delta : null;
  });

  useLayoutEffect(() => {
    prevNumArrayRef.current = numArray;
  }, [numArray]);

  const selectionText = useMemo(() => {
    const chars = numArray.slice().reverse();
    if (isNegative) {
      chars.unshift('-');
    }
    return chars.join('');
  }, [numArray, isNegative]);

  const selectRef = useRef<HTMLSpanElement>(null);

  const selectionStyle = useMemo(() => ({
    ...digitStyles,
    fontSize: resolvedFontSize,
    lineHeight: 1,
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  } as React.CSSProperties), [digitStyles, resolvedFontSize]);

  // Spread one text run across the animated number so a drag selects it as a
  // single string, while the highlight still covers the visible digits.
  useLayoutEffect(() => {
    const el = selectRef.current;
    const parent = el?.parentElement;
    if (!el || !parent) {
      return;
    }

    const fit = () => {
      el.style.letterSpacing = '0px';
      const natural = el.offsetWidth;
      const target = parent.clientWidth;
      const gaps = Math.max(selectionText.length - 1, 1);
      const extra = target - natural;
      el.style.letterSpacing = `${Math.abs(extra) < 0.25 ? 0 : extra / gaps}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [selectionText, selectionStyle]);

  return (
    <div className='ticker-view ticker-slot' style={containerStyles}>
      <span ref={selectRef} className="ticker-slot-select" style={selectionStyle}>
        {selectionText}
      </span>
      {/* Format integer to NumberColumn components */}
      {numArray.map((number: string, index: number) =>
        number === "." || number === "," ? (
          <DecimalColumn
            key={index}
            fontSize={resolvedFontSize}
            color={color}
            isComma={number === ","}
            digitStyles={digitStyles}
          />
        ) : (
          <NumberColumn
            key={index}
            digit={number}
            delta={pulseDeltaAtIndex[index]}
            color={color}
            fontSize={resolvedFontSize}
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
          fontSize={resolvedFontSize}
          incrementColor={incrementColor}
          decrementColor={decrementColor}
          digitStyles={digitStyles}
        />
      }
    </div>
  );
}

export default React.memo(AnimatedCounter);