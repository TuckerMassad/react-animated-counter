// Creates array of digits to vertically scroll through
var formatForDisplay = function (number) {
    var parsedNumber = parseFloat("".concat(Math.max(number, 0))).toFixed();
    return parsedNumber.split('').reverse();
};
export default formatForDisplay;
//# sourceMappingURL=formatForDisplay.js.map