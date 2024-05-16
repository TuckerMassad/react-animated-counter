import { __assign } from "tslib";
import React, { memo, useEffect, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatForDisplay } from "./util";
import { usePrevious } from "./hooks";
import debounce from 'lodash/debounce';
import './styles.css';
// Decimal element component
var DecimalColumn = function (_a) {
    var fontSize = _a.fontSize, color = _a.color, isComma = _a.isComma, digitStyles = _a.digitStyles;
    return (React.createElement("span", { style: __assign({ fontSize: fontSize, lineHeight: fontSize, color: color, marginLeft: "calc(-".concat(fontSize, " / 10)") }, digitStyles) }, isComma ? ',' : '.'));
};
// Individual number element component
var NumberColumn = memo(function (_a) {
    var digit = _a.digit, delta = _a.delta, fontSize = _a.fontSize, color = _a.color, incrementColor = _a.incrementColor, decrementColor = _a.decrementColor, digitStyles = _a.digitStyles;
    var _b = useState(0), position = _b[0], setPosition = _b[1];
    var _c = useState(null), animationClass = _c[0], setAnimationClass = _c[1];
    var currentDigit = +digit;
    var previousDigit = usePrevious(+currentDigit);
    var columnContainer = useRef(null);
    var handleAnimationComplete = useCallback(debounce(function () {
        setAnimationClass("");
    }, 200), []);
    var setColumnToNumber = useCallback(function (number) {
        var _a, _b;
        if ((_a = columnContainer === null || columnContainer === void 0 ? void 0 : columnContainer.current) === null || _a === void 0 ? void 0 : _a.clientHeight) {
            setPosition(((_b = columnContainer === null || columnContainer === void 0 ? void 0 : columnContainer.current) === null || _b === void 0 ? void 0 : _b.clientHeight) * parseInt(number, 10));
        }
    }, []);
    useEffect(function () {
        setAnimationClass(previousDigit !== currentDigit ? delta : '');
    }, [digit, delta]);
    useEffect(function () {
        setColumnToNumber(digit);
    }, [digit, setColumnToNumber]);
    // If digit is negative symbol, simply return an unanimated character
    if (digit === '-') {
        return (React.createElement("span", { style: __assign({ color: color, fontSize: fontSize, lineHeight: fontSize, marginRight: "calc(".concat(fontSize, " / 5)") }, digitStyles) }, digit));
    }
    return (React.createElement("div", { className: 'ticker-column-container', ref: columnContainer, style: __assign({ fontSize: fontSize, lineHeight: fontSize, height: 'auto', color: color, '--increment-color': "".concat(incrementColor), '--decrement-color': "".concat(decrementColor) }, digitStyles) },
        React.createElement(motion.div, { animate: { x: 0, y: position }, className: "ticker-column ".concat(animationClass), onAnimationComplete: handleAnimationComplete }, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(function (num) { return (React.createElement("div", { className: 'ticker-digit', key: num },
            React.createElement("span", { style: __assign({ fontSize: fontSize, lineHeight: fontSize }, digitStyles) }, num))); })),
        React.createElement("span", { className: 'number-placeholder' }, "0")));
}, function (prevProps, nextProps) { return prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta; });
// Main component
var AnimatedCounter = function (_a) {
    var _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.fontSize, fontSize = _c === void 0 ? '18px' : _c, _d = _a.color, color = _d === void 0 ? 'black' : _d, _e = _a.incrementColor, incrementColor = _e === void 0 ? '#32cd32' : _e, _f = _a.decrementColor, decrementColor = _f === void 0 ? '#fe6862' : _f, _g = _a.includeDecimals, includeDecimals = _g === void 0 ? true : _g, _h = _a.decimalPrecision, decimalPrecision = _h === void 0 ? 2 : _h, _j = _a.includeCommas, includeCommas = _j === void 0 ? false : _j, _k = _a.containerStyles, containerStyles = _k === void 0 ? {} : _k, _l = _a.digitStyles, digitStyles = _l === void 0 ? {} : _l;
    var numArray = formatForDisplay(Math.abs(value), includeDecimals, decimalPrecision, includeCommas);
    var previousNumber = usePrevious(value);
    var isNegative = value < 0;
    var delta = null;
    if (previousNumber !== null) {
        if (value > previousNumber) {
            delta = 'increase';
        }
        else if (value < previousNumber) {
            delta = 'decrease';
        }
    }
    return (React.createElement(motion.div, { layout: true, className: 'ticker-view', style: __assign({}, containerStyles) },
        numArray.map(function (number, index) {
            return number === "." || number === "," ? (React.createElement(DecimalColumn, { key: index, fontSize: fontSize, color: color, isComma: number === ",", digitStyles: digitStyles })) : (React.createElement(NumberColumn, { key: index, digit: number, delta: delta, color: color, fontSize: fontSize, incrementColor: incrementColor, decrementColor: decrementColor, digitStyles: digitStyles }));
        }),
        isNegative &&
            React.createElement(NumberColumn, { key: 'negative-feedback', digit: '-', delta: delta, color: color, fontSize: fontSize, incrementColor: incrementColor, decrementColor: decrementColor, digitStyles: digitStyles })));
};
export default AnimatedCounter;