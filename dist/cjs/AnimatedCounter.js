"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var framer_motion_1 = require("framer-motion");
var util_1 = require("./util");
var hooks_1 = require("./hooks");
require("./styles.css");
// Decimal element component
var DecimalColumn = function (_a) {
    var fontSize = _a.fontSize, color = _a.color;
    return (react_1["default"].createElement("span", { style: { fontSize: fontSize, lineHeight: fontSize, color: color } }, "."));
};
// Individual number element component
var NumberColumn = (0, react_1.memo)(function (_a) {
    var digit = _a.digit, delta = _a.delta, fontSize = _a.fontSize, color = _a.color, incrementColor = _a.incrementColor, decrementColor = _a.decrementColor;
    var _b = (0, react_1.useState)(0), position = _b[0], setPosition = _b[1];
    var _c = (0, react_1.useState)(null), animationClass = _c[0], setAnimationClass = _c[1];
    var currentDigit = +digit;
    var previousDigit = (0, hooks_1.usePrevious)(+currentDigit);
    var columnContainer = (0, react_1.useRef)(null);
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
    return (react_1["default"].createElement("div", { className: 'ticker-column-container', ref: columnContainer, style: {
            fontSize: fontSize,
            lineHeight: fontSize,
            height: 'auto',
            color: color,
            '--increment-color': "".concat(incrementColor),
            '--decrement-color': "".concat(decrementColor)
        } },
        react_1["default"].createElement(framer_motion_1.motion.div, { animate: { x: 0, y: position }, className: "ticker-column ".concat(animationClass), onAnimationComplete: function () { return setAnimationClass(""); } }, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(function (num) { return (react_1["default"].createElement("div", { className: 'ticker-digit', key: num },
            react_1["default"].createElement("span", { style: {
                    fontSize: fontSize,
                    lineHeight: fontSize,
                    width: (0, util_1.calculateDigitWidth)(num)
                } }, num))); })),
        react_1["default"].createElement("span", { className: 'number-placeholder' }, "0")));
}, function (prevProps, nextProps) { return prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta; });
// Main component
var AnimatedCounter = function (_a) {
    var _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.fontSize, fontSize = _c === void 0 ? '18px' : _c, _d = _a.color, color = _d === void 0 ? 'black' : _d, _e = _a.incrementColor, incrementColor = _e === void 0 ? '#32cd32' : _e, _f = _a.decrementColor, decrementColor = _f === void 0 ? '#fe6862' : _f, _g = _a.includeDecimals, includeDecimals = _g === void 0 ? true : _g, _h = _a.decimalPrecision, decimalPrecision = _h === void 0 ? 2 : _h;
    var numArray = (0, util_1.formatForDisplay)(value, includeDecimals, decimalPrecision);
    var previousNumber = (0, hooks_1.usePrevious)(value);
    var delta = null;
    if (previousNumber !== null) {
        if (value > previousNumber) {
            delta = 'increase';
        }
        else if (value < previousNumber) {
            delta = 'decrease';
        }
    }
    return (react_1["default"].createElement(framer_motion_1.motion.div, { layout: true, className: 'ticker-view' }, numArray.map(function (number, index) {
        return number === "." ? (react_1["default"].createElement(DecimalColumn, { key: index, fontSize: fontSize, color: color })) : (react_1["default"].createElement(NumberColumn, { key: index, digit: number, delta: delta, color: color, fontSize: fontSize, incrementColor: incrementColor, decrementColor: decrementColor }));
    })));
};
exports["default"] = AnimatedCounter;
//# sourceMappingURL=AnimatedCounter.js.map