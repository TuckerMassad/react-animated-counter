// Creates array of digits to vertically scroll through
const formatForDisplay = (
  number: number,
  includeDecimals: boolean,
  decimalPrecision: number,
  includeCommas: boolean
): string[] => {
  const decimalCount = includeDecimals ? decimalPrecision : 0;
  const parsedNumber = parseFloat(`${Math.max(number, 0)}`).toFixed(
    decimalCount
  );
  const numberToFormat = includeCommas
    ? parseFloat(parsedNumber).toLocaleString("en-US", {
        minimumFractionDigits: includeDecimals ? decimalPrecision : 0,
      })
    : parsedNumber;
  return numberToFormat.split("").reverse();
};

export default formatForDisplay;
