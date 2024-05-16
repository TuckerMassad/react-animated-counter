"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var framer_motion_1 = require("framer-motion");
var util_1 = require("./util");
var hooks_1 = require("./hooks");
var debounce_1 = tslib_1.__importDefault(require("lodash/debounce"));
require("./styles.css");
// Decimal element component
var DecimalColumn = function (_a) {
    var fontSize = _a.fontSize, color = _a.color, isComma = _a.isComma, digitStyles = _a.digitStyles;
    return (react_1["default"].createElement("span", { style: tslib_1.__assign({ fontSize: fontSize, lineHeight: fontSize, color: color, marginLeft: "calc(-".concat(fontSize, " / 10)") }, digitStyles) }, isComma ? ',' : '.'));
};
// Individual number element component
var NumberColumn = (0, react_1.memo)(function (_a) {
    var digit = _a.digit, delta = _a.delta, fontSize = _a.fontSize, color = _a.color, incrementColor = _a.incrementColor, decrementColor = _a.decrementColor, digitStyles = _a.digitStyles;
    var _b = (0, react_1.useState)(0), position = _b[0], setPosition = _b[1];
    var _c = (0, react_1.useState)(null), animationClass = _c[0], setAnimationClass = _c[1];
    var currentDigit = +digit;
    var previousDigit = (0, hooks_1.usePrevious)(+currentDigit);
    var columnContainer = (0, react_1.useRef)(null);
    var handleAnimationComplete = (0, react_1.useCallback)((0, debounce_1["default"])(function () {
        setAnimationClass("");
    }, 200), []);
    var setColumnToNumber = (0, react_1.useCallback)(function (number) {
        var _a, _b;
        if ((_a = columnContainer === null || columnContainer === void 0 ? void 0 : columnContainer.current) === null || _a === void 0 ? void 0 : _a.clientHeight) {
            setPosition(((_b = columnContainer === null || columnContainer === void 0 ? void 0 : columnContainer.current) === null || _b === void 0 ? void 0 : _b.clientHeight) * parseInt(number, 10));
        }
    }, []);
    (0, react_1.useEffect)(function () {
        setAnimationClass(previousDigit !== currentDigit ? delta : '');
    }, [digit, delta]);
    (0, react_1.useEffect)(function () {
        setColumnToNumber(digit);
    }, [digit, setColumnToNumber]);
    // If digit is negative symbol, simply return an unanimated character
    if (digit === '-') {
        return (react_1["default"].createElement("span", { style: tslib_1.__assign({ color: color, fontSize: fontSize, lineHeight: fontSize, marginRight: "calc(".concat(fontSize, " / 5)") }, digitStyles) }, digit));
    }
    return (react_1["default"].createElement("div", { className: 'ticker-column-container', ref: columnContainer, style: tslib_1.__assign({ fontSize: fontSize, lineHeight: fontSize, height: 'auto', color: color, '--increment-color': "".concat(incrementColor), '--decrement-color': "".concat(decrementColor) }, digitStyles) },
        react_1["default"].createElement(framer_motion_1.motion.div, { animate: { x: 0, y: position }, className: "ticker-column ".concat(animationClass), onAnimationComplete: handleAnimationComplete }, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(function (num) { return (react_1["default"].createElement("div", { className: 'ticker-digit', key: num },
            react_1["default"].createElement("span", { style: tslib_1.__assign({ fontSize: fontSize, lineHeight: fontSize }, digitStyles) }, num))); })),
        react_1["default"].createElement("span", { className: 'number-placeholder' }, "0")));
}, function (prevProps, nextProps) { return prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta; });
// Main component
var AnimatedCounter = function (_a) {
    var _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.fontSize, fontSize = _c === void 0 ? '18px' : _c, _d = _a.color, color = _d === void 0 ? 'black' : _d, _e = _a.incrementColor, incrementColor = _e === void 0 ? '#32cd32' : _e, _f = _a.decrementColor, decrementColor = _f === void 0 ? '#fe6862' : _f, _g = _a.includeDecimals, includeDecimals = _g === void 0 ? true : _g, _h = _a.decimalPrecision, decimalPrecision = _h === void 0 ? 2 : _h, _j = _a.includeCommas, includeCommas = _j === void 0 ? false : _j, _k = _a.containerStyles, containerStyles = _k === void 0 ? {} : _k, _l = _a.digitStyles, digitStyles = _l === void 0 ? {} : _l;
    var numArray = (0, util_1.formatForDisplay)(Math.abs(value), includeDecimals, decimalPrecision, includeCommas);
    var previousNumber = (0, hooks_1.usePrevious)(value);
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
    return (react_1["default"].createElement(framer_motion_1.motion.div, { layout: true, className: 'ticker-view', style: tslib_1.__assign({}, containerStyles) },
        numArray.map(function (number, index) {
            return number === "." || number === "," ? (react_1["default"].createElement(DecimalColumn, { key: index, fontSize: fontSize, color: color, isComma: number === ",", digitStyles: digitStyles })) : (react_1["default"].createElement(NumberColumn, { key: index, digit: number, delta: delta, color: color, fontSize: fontSize, incrementColor: incrementColor, decrementColor: decrementColor, digitStyles: digitStyles }));
        }),
        isNegative &&
            react_1["default"].createElement(NumberColumn, { key: 'negative-feedback', digit: '-', delta: delta, color: color, fontSize: fontSize, incrementColor: incrementColor, decrementColor: decrementColor, digitStyles: digitStyles })));
};
exports["default"] = AnimatedCounter;