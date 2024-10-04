"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return (react_1.default.createElement("span", { style: tslib_1.__assign({ fontSize: fontSize, lineHeight: fontSize, color: color, marginLeft: "calc(-".concat(fontSize, " / 10)") }, digitStyles) }, isComma ? "," : "."));
};
// Individual number element component
var NumberColumn = (0, react_1.memo)(function (_a) {
    var digit = _a.digit, delta = _a.delta, fontSize = _a.fontSize, color = _a.color, duration = _a.duration, digitStyles = _a.digitStyles;
    var _b = (0, react_1.useState)(0), position = _b[0], setPosition = _b[1];
    var _c = (0, react_1.useState)(null), animationClass = _c[0], setAnimationClass = _c[1];
    var currentDigit = +digit;
    var previousDigit = (0, hooks_1.usePrevious)(+currentDigit);
    var columnContainer = (0, react_1.useRef)(null);
    var handleAnimationComplete = (0, react_1.useCallback)((0, debounce_1.default)(function () {
        setAnimationClass("");
    }, 700), []);
    var setColumnToNumber = (0, react_1.useCallback)(function (number) {
        var _a, _b;
        if ((_a = columnContainer === null || columnContainer === void 0 ? void 0 : columnContainer.current) === null || _a === void 0 ? void 0 : _a.clientHeight) {
            setPosition(((_b = columnContainer === null || columnContainer === void 0 ? void 0 : columnContainer.current) === null || _b === void 0 ? void 0 : _b.clientHeight) * parseInt(number, 10));
        }
    }, []);
    (0, react_1.useEffect)(function () {
        setAnimationClass(previousDigit !== currentDigit ? delta : "");
    }, [digit, delta]);
    (0, react_1.useEffect)(function () {
        setColumnToNumber(digit);
    }, [digit, setColumnToNumber]);
    // If digit is negative symbol, simply return an unanimated character
    if (digit === "-") {
        return (react_1.default.createElement("span", { style: tslib_1.__assign({ color: color, fontSize: fontSize, lineHeight: fontSize, marginRight: "calc(".concat(fontSize, " / 5)") }, digitStyles) }, digit));
    }
    return (react_1.default.createElement("div", { className: "ticker-column-container", ref: columnContainer, style: tslib_1.__assign({ fontSize: fontSize, lineHeight: fontSize, height: "auto", color: color }, digitStyles) },
        react_1.default.createElement(framer_motion_1.motion.div, { animate: { x: 0, y: position }, transition: { duration: duration }, className: "ticker-column ".concat(animationClass), onAnimationComplete: handleAnimationComplete }, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(function (num) { return (react_1.default.createElement("div", { className: "ticker-digit", key: num },
            react_1.default.createElement("span", { style: tslib_1.__assign({ fontSize: fontSize, lineHeight: fontSize }, digitStyles) }, num))); })),
        react_1.default.createElement("span", { className: "number-placeholder" }, "0")));
}, function (prevProps, nextProps) {
    return prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta;
});
// Main component
var AnimatedPercent = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "black" : _b, _c = _a.containerStyles, containerStyles = _c === void 0 ? {} : _c, _d = _a.decimalPrecision, decimalPrecision = _d === void 0 ? 2 : _d, _e = _a.digitStyles, digitStyles = _e === void 0 ? {} : _e, _f = _a.duration, duration = _f === void 0 ? 0.7 : _f, _g = _a.fontSize, fontSize = _g === void 0 ? "18px" : _g, _h = _a.includeCommas, includeCommas = _h === void 0 ? false : _h, _j = _a.includeDecimals, includeDecimals = _j === void 0 ? true : _j, _k = _a.value, value = _k === void 0 ? 0 : _k;
    var numArray = (0, util_1.formatForDisplay)(Math.abs(value), includeDecimals, decimalPrecision, includeCommas);
    var previousNumber = (0, hooks_1.usePrevious)(value);
    var isNegative = value < 0;
    var delta = null;
    if (previousNumber !== null) {
        if (value > previousNumber) {
            delta = "increase";
        }
        else if (value < previousNumber) {
            delta = "decrease";
        }
    }
    return (react_1.default.createElement("div", { className: "ticker-view", style: tslib_1.__assign({}, containerStyles) },
        react_1.default.createElement("span", { style: tslib_1.__assign({ color: color, fontSize: fontSize, lineHeight: fontSize, marginRight: "calc(".concat(fontSize, " / 5)") }, digitStyles) }, "%"),
        numArray.map(function (number, index) {
            return number === "." || number === "," ? (react_1.default.createElement(DecimalColumn, { key: index, fontSize: fontSize, color: color, isComma: number === ",", digitStyles: digitStyles })) : (react_1.default.createElement(NumberColumn, { key: index, digit: number, delta: delta, color: color, fontSize: fontSize, duration: duration, digitStyles: digitStyles }));
        }),
        isNegative && (react_1.default.createElement(NumberColumn, { key: "negative-feedback", digit: "-", delta: delta, color: color, fontSize: fontSize, duration: duration, digitStyles: digitStyles }))));
};
exports.default = AnimatedPercent;
//# sourceMappingURL=AnimatedPercent.js.map