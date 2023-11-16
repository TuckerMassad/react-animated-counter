// Creates array of digits to vertically scroll through
const formatForDisplay = (
  number: number,
  includeDecimals: boolean,
  decimalPrecision: number,
): string[] => {
  const decimalCount = includeDecimals ? decimalPrecision : 0;
  return parseFloat(`${Math.max(number, 0)}`).toFixed(decimalCount).split('').reverse();
}

export default formatForDisplay;