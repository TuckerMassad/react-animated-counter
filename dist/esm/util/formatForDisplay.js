// Creates array of digits to vertically scroll through
var formatForDisplay = function (number, includeDecimals, decimalPrecision, formatLocale) {
    var decimalCount = includeDecimals ? decimalPrecision : 0;
    var parsedNumber = parseFloat("".concat(Math.max(number, 0))).toFixed(decimalCount);
    var numberToFormat = formatLocale ? parseFloat(parsedNumber).toLocaleString(undefined, { minimumFractionDigits: includeDecimals ? decimalPrecision : 0 }) : parsedNumber;
    return numberToFormat.split('').reverse();
};
export default formatForDisplay;