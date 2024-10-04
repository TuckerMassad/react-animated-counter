"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Creates array of digits to vertically scroll through
var formatForDisplay = function (number, includeDecimals, decimalPrecision, includeCommas) {
    var decimalCount = includeDecimals ? decimalPrecision : 0;
    var parsedNumber = parseFloat("".concat(Math.max(number, 0))).toFixed(decimalCount);
    var numberToFormat = includeCommas
        ? parseFloat(parsedNumber).toLocaleString("en-US", {
            minimumFractionDigits: includeDecimals ? decimalPrecision : 0,
        })
        : parsedNumber;
    return numberToFormat.split("").reverse();
};
exports.default = formatForDisplay;
//# sourceMappingURL=formatForDisplay.js.map