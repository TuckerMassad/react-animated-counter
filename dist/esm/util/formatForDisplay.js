// Creates array of digits to vertically scroll through
var formatForDisplay = function (number, includeDecimals, decimalPrecision, includeCommas) {
    var decimalCount = includeDecimals ? decimalPrecision : 0;
    var parsedNumber = parseFloat("".concat(Math.max(number, 0))).toFixed(decimalCount);
    var numberToFormat = includeCommas ? parseFloat(parsedNumber).toLocaleString('en-US', { minimumFractionDigits: includeDecimals ? decimalPrecision : 0 }) : parsedNumber;
    return numberToFormat.split('').reverse();
};
export default formatForDisplay;
//# sourceMappingURL=formatForDisplay.js.map