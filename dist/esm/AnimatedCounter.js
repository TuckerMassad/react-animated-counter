import { __assign } from "tslib";
import './AnimatedCounter.styles.scss';
import React, { memo, useEffect, useRef, useState, useMemo } from 'react';
import { motion } from "framer-motion";
import { formatForDisplay } from "./util";
import { usePrevious } from "./hooks";
import debounce from 'lodash/debounce';
// Array of digits to vertically scroll through
var DIGIT_ARRAY = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
// Decimal element component
var DecimalColumn = memo(function (_a) {
    var fontSize = _a.fontSize, color = _a.color, isComma = _a.isComma, digitStyles = _a.digitStyles;
    var decimalStyle = useMemo(function () { return (__assign({ fontSize: fontSize, lineHeight: fontSize, color: color, marginLeft: "calc(-".concat(fontSize, " / 10)") }, digitStyles)); }, [fontSize, color, digitStyles]);
    return (React.createElement("span", { style: decimalStyle }, isComma ? ',' : '.'));
});
// Individual number element component
var NumberColumn = memo(function (_a) {
    var digit = _a.digit, delta = _a.delta, fontSize = _a.fontSize, color = _a.color, incrementColor = _a.incrementColor, decrementColor = _a.decrementColor, digitStyles = _a.digitStyles;
    var fontSizeValue = parseFloat(fontSize.replace('px', ''));
    var digitValue = parseInt(digit, 10);
    var _b = useState(fontSizeValue * digitValue), position = _b[0], setPosition = _b[1];
    var _c = useState(null), animationClass = _c[0], setAnimationClass = _c[1];
    var currentDigit = +digit;
    var previousDigit = usePrevious(+currentDigit);
    var columnContainer = useRef(null);
    var hasHydrated = useRef(false);
    var handleAnimationComplete = useMemo(function () {
        return debounce(function () {
            setAnimationClass("");
        }, 200);
    }, []);
    // Update the column position
    useEffect(function () {
        if (Number.isNaN(digitValue) || Number.isNaN(fontSizeValue)) {
            return;
        }
        // Each 'row' is assumed to be roughly one fontSize tall
        var newPosition = fontSizeValue * digitValue;
        setPosition(newPosition);
    }, [digitValue, fontSizeValue]);
    var containerStyle = useMemo(function () { return (__assign({ fontSize: fontSize, lineHeight: fontSize, height: 'auto', color: color, '--increment-color': "".concat(incrementColor), '--decrement-color': "".concat(decrementColor) }, digitStyles)); }, [fontSize, color, incrementColor, decrementColor, digitStyles]);
    var digitSpanStyle = useMemo(function () { return (__assign({ fontSize: fontSize, lineHeight: fontSize }, digitStyles)); }, [fontSize, digitStyles]);
    var negativeStyle = useMemo(function () { return (__assign({ color: color, fontSize: fontSize, lineHeight: fontSize, marginRight: "calc(".concat(fontSize, " / 5)") }, digitStyles)); }, [color, fontSize, digitStyles]);
    useEffect(function () {
        if (!hasHydrated.current) {
            hasHydrated.current = true;
            return;
        }
        setAnimationClass(previousDigit !== currentDigit ? delta : '');
    }, [digit, delta]);
    // If digit is negative symbol, simply return an unanimated character
    if (digit === '-') {
        return (React.createElement("span", { style: negativeStyle }, digit));
    }
    return (React.createElement("div", { className: 'ticker-column-container', ref: columnContainer, style: containerStyle },
        React.createElement(motion.div, __assign({ initial: { x: 0, y: position }, animate: { x: 0, y: position }, className: "ticker-column ".concat(animationClass), onAnimationComplete: handleAnimationComplete }, (!hasHydrated.current && { transition: { duration: 0 } })), DIGIT_ARRAY.map(function (num) { return (React.createElement("div", { className: 'ticker-digit', key: num },
            React.createElement("span", { style: digitSpanStyle }, num))); })),
        React.createElement("span", { className: 'number-placeholder' }, "0")));
}, function (prevProps, nextProps) {
    return (prevProps.digit === nextProps.digit &&
        prevProps.delta === nextProps.delta &&
        prevProps.fontSize === nextProps.fontSize &&
        prevProps.color === nextProps.color &&
        prevProps.incrementColor === nextProps.incrementColor &&
        prevProps.decrementColor === nextProps.decrementColor &&
        JSON.stringify(prevProps.digitStyles) === JSON.stringify(nextProps.digitStyles));
});
// Main component
var AnimatedCounter = function (_a) {
    var _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.fontSize, fontSize = _c === void 0 ? '18px' : _c, _d = _a.color, color = _d === void 0 ? 'black' : _d, _e = _a.incrementColor, incrementColor = _e === void 0 ? '#32cd32' : _e, _f = _a.decrementColor, decrementColor = _f === void 0 ? '#fe6862' : _f, _g = _a.includeDecimals, includeDecimals = _g === void 0 ? true : _g, _h = _a.decimalPrecision, decimalPrecision = _h === void 0 ? 2 : _h, _j = _a.includeCommas, includeCommas = _j === void 0 ? false : _j, _k = _a.containerStyles, containerStyles = _k === void 0 ? {} : _k, _l = _a.digitStyles, digitStyles = _l === void 0 ? {} : _l;
    var hasInitialRender = useRef(true);
    var numArray = useMemo(function () {
        return formatForDisplay(Math.abs(value), includeDecimals, decimalPrecision, includeCommas);
    }, [value, includeDecimals, decimalPrecision, includeCommas]);
    var previousNumber = usePrevious(value);
    var isNegative = value < 0;
    var delta = useMemo(function () {
        if (previousNumber !== null) {
            if (value > previousNumber) {
                return 'increase';
            }
            else if (value < previousNumber) {
                return 'decrease';
            }
        }
        return null;
    }, [value, previousNumber]);
    // Mark as hydrated after first render
    useEffect(function () {
        hasInitialRender.current = false;
    }, []);
    return (React.createElement(motion.div, { className: 'ticker-view', style: containerStyles },
        numArray.map(function (number, index) {
            return number === "." || number === "," ? (React.createElement(DecimalColumn, { key: index, fontSize: fontSize, color: color, isComma: number === ",", digitStyles: digitStyles })) : (React.createElement(NumberColumn, { key: index, digit: number, delta: delta, color: color, fontSize: fontSize, incrementColor: incrementColor, decrementColor: decrementColor, digitStyles: digitStyles }));
        }),
        isNegative &&
            React.createElement(NumberColumn, { key: 'negative-feedback', digit: '-', delta: delta, color: color, fontSize: fontSize, incrementColor: incrementColor, decrementColor: decrementColor, digitStyles: digitStyles })));
};
export default React.memo(AnimatedCounter);
//# sourceMappingURL=AnimatedCounter.js.map