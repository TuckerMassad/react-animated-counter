"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("./styles.css");
var react_1 = tslib_1.__importStar(require("react"));
var util_1 = require("./util");
var hooks_1 = require("./hooks");
// Array of digits to vertically scroll through
var DIGIT_ARRAY = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
var BARE_NUMBER = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;
var EMPTY_DIGIT_STYLES = {};
// A unitless fontSize used to mean pixels. Lengths such as rem, em, and vh
// are passed through so 1em in the slot matches that computed size.
var normalizeFontSize = function (fontSize) {
    var trimmed = fontSize.trim();
    return BARE_NUMBER.test(trimmed) ? "".concat(trimmed, "px") : trimmed;
};
// Decimal element component
var DecimalColumn = (0, react_1.memo)(function (_a) {
    var fontSize = _a.fontSize, color = _a.color, isComma = _a.isComma, digitStyles = _a.digitStyles;
    var decimalStyle = (0, react_1.useMemo)(function () { return (tslib_1.__assign({ fontSize: fontSize, lineHeight: 1, height: '1em', color: color, marginLeft: "calc(-".concat(fontSize, " / 10)") }, digitStyles)); }, [fontSize, color, digitStyles]);
    return (react_1.default.createElement("span", { style: decimalStyle, "aria-hidden": "true" }, isComma ? ',' : '.'));
});
// Individual number element component
var NumberColumn = (0, react_1.memo)(function (_a) {
    var digit = _a.digit, delta = _a.delta, fontSize = _a.fontSize, color = _a.color, incrementColor = _a.incrementColor, decrementColor = _a.decrementColor, digitStyles = _a.digitStyles;
    var digitValue = parseInt(digit, 10);
    var _b = (0, react_1.useState)(null), animationClass = _b[0], setAnimationClass = _b[1];
    var hasHydrated = (0, react_1.useRef)(false);
    var clearAnimationClass = (0, react_1.useCallback)(function () {
        setAnimationClass('');
    }, []);
    var targetSlot = Number.isNaN(digitValue) ? 0 : digitValue;
    var columnClassName = ['ticker-column', animationClass].filter(Boolean).join(' ');
    var _c = (0, hooks_1.useSpringColumnTransform)(targetSlot, {
        onSettled: clearAnimationClass,
        layoutClassName: columnClassName,
    }), columnRef = _c.ref, ssrTransformStyle = _c.ssrTransformStyle;
    var containerStyle = (0, react_1.useMemo)(function () { return (tslib_1.__assign({ fontSize: fontSize, lineHeight: 1, color: color, '--increment-color': "".concat(incrementColor), '--decrement-color': "".concat(decrementColor) }, digitStyles)); }, [fontSize, color, incrementColor, decrementColor, digitStyles]);
    var digitSpanStyle = (0, react_1.useMemo)(function () { return (tslib_1.__assign({ fontSize: fontSize, lineHeight: 1 }, digitStyles)); }, [fontSize, digitStyles]);
    var negativeStyle = (0, react_1.useMemo)(function () { return (tslib_1.__assign({ color: color, fontSize: fontSize, lineHeight: 1, height: '1em', marginRight: "calc(".concat(fontSize, " / 5)") }, digitStyles)); }, [color, fontSize, digitStyles]);
    (0, react_1.useEffect)(function () {
        if (!hasHydrated.current) {
            hasHydrated.current = true;
            return;
        }
        setAnimationClass(delta != null ? delta : '');
    }, [digit, delta]);
    // If digit is negative symbol, simply return an unanimated character
    if (digit === '-') {
        return (react_1.default.createElement("span", { style: negativeStyle, "aria-hidden": "true" }, digit));
    }
    return (react_1.default.createElement("div", { className: 'ticker-column-container', style: containerStyle, "aria-hidden": "true" },
        react_1.default.createElement("div", { ref: columnRef, className: columnClassName, style: ssrTransformStyle }, DIGIT_ARRAY.map(function (num) { return (react_1.default.createElement("div", { className: 'ticker-digit', key: num, style: { '--digit': num } },
            react_1.default.createElement("span", { style: digitSpanStyle }, num))); })),
        react_1.default.createElement("span", { className: 'number-placeholder' }, "0")));
}, function (prevProps, nextProps) {
    return (prevProps.digit === nextProps.digit &&
        prevProps.delta === nextProps.delta &&
        prevProps.fontSize === nextProps.fontSize &&
        prevProps.color === nextProps.color &&
        prevProps.incrementColor === nextProps.incrementColor &&
        prevProps.decrementColor === nextProps.decrementColor &&
        (0, util_1.shallowStyleEqual)(prevProps.digitStyles, nextProps.digitStyles));
});
// Main component
var AnimatedCounter = function (_a) {
    var _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.fontSize, fontSize = _c === void 0 ? '18px' : _c, _d = _a.color, color = _d === void 0 ? 'black' : _d, _e = _a.incrementColor, incrementColor = _e === void 0 ? '#32cd32' : _e, _f = _a.decrementColor, decrementColor = _f === void 0 ? '#fe6862' : _f, _g = _a.includeDecimals, includeDecimals = _g === void 0 ? true : _g, _h = _a.decimalPrecision, decimalPrecision = _h === void 0 ? 2 : _h, _j = _a.includeCommas, includeCommas = _j === void 0 ? false : _j, _k = _a.containerStyles, containerStyles = _k === void 0 ? EMPTY_DIGIT_STYLES : _k, _l = _a.digitStyles, digitStyles = _l === void 0 ? EMPTY_DIGIT_STYLES : _l;
    var resolvedFontSize = normalizeFontSize(fontSize);
    var numArray = (0, react_1.useMemo)(function () {
        return (0, util_1.formatForDisplay)(Math.abs(value), includeDecimals, decimalPrecision, includeCommas);
    }, [value, includeDecimals, decimalPrecision, includeCommas]);
    var previousNumber = (0, hooks_1.usePrevious)(value);
    var isNegative = value < 0;
    var delta = (0, react_1.useMemo)(function () {
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
    var prevNumArrayRef = (0, react_1.useRef)(undefined);
    var prevFormattedDigits = prevNumArrayRef.current;
    var pulseDeltaAtIndex = numArray.map(function (ch, i) {
        if (ch === '.' || ch === ',') {
            return null;
        }
        if (prevFormattedDigits == null) {
            return delta;
        }
        return prevFormattedDigits[i] !== ch ? delta : null;
    });
    (0, react_1.useLayoutEffect)(function () {
        prevNumArrayRef.current = numArray;
    }, [numArray]);
    var selectionText = (0, react_1.useMemo)(function () {
        var chars = numArray.slice().reverse();
        if (isNegative) {
            chars.unshift('-');
        }
        return chars.join('');
    }, [numArray, isNegative]);
    var selectRef = (0, react_1.useRef)(null);
    var selectionStyle = (0, react_1.useMemo)(function () { return (tslib_1.__assign(tslib_1.__assign({}, digitStyles), { fontSize: resolvedFontSize, lineHeight: 1, color: 'transparent', WebkitTextFillColor: 'transparent' })); }, [digitStyles, resolvedFontSize]);
    // Spread one text run across the animated number so a drag selects it as a
    // single string, while the highlight still covers the visible digits.
    (0, react_1.useLayoutEffect)(function () {
        var el = selectRef.current;
        var parent = el === null || el === void 0 ? void 0 : el.parentElement;
        if (!el || !parent) {
            return;
        }
        var fit = function () {
            el.style.letterSpacing = '0px';
            var natural = el.offsetWidth;
            var target = parent.clientWidth;
            var gaps = Math.max(selectionText.length - 1, 1);
            var extra = target - natural;
            el.style.letterSpacing = "".concat(Math.abs(extra) < 0.25 ? 0 : extra / gaps, "px");
        };
        fit();
        var observer = new ResizeObserver(fit);
        observer.observe(parent);
        return function () { return observer.disconnect(); };
    }, [selectionText, selectionStyle]);
    return (react_1.default.createElement("div", { className: 'ticker-view ticker-slot', style: containerStyles },
        react_1.default.createElement("span", { ref: selectRef, className: "ticker-slot-select", style: selectionStyle }, selectionText),
        numArray.map(function (number, index) {
            return number === "." || number === "," ? (react_1.default.createElement(DecimalColumn, { key: index, fontSize: resolvedFontSize, color: color, isComma: number === ",", digitStyles: digitStyles })) : (react_1.default.createElement(NumberColumn, { key: index, digit: number, delta: pulseDeltaAtIndex[index], color: color, fontSize: resolvedFontSize, incrementColor: incrementColor, decrementColor: decrementColor, digitStyles: digitStyles }));
        }),
        isNegative &&
            react_1.default.createElement(NumberColumn, { key: 'negative-feedback', digit: '-', delta: delta, color: color, fontSize: resolvedFontSize, incrementColor: incrementColor, decrementColor: decrementColor, digitStyles: digitStyles })));
};
exports.default = react_1.default.memo(AnimatedCounter);
//# sourceMappingURL=AnimatedCounter.js.map