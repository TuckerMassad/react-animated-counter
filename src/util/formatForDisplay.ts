// Creates array of digits to vertically scroll through
const formatForDisplay = (
  number: number,
  includeDecimals: boolean,
  decimalPrecision: number,
  formatLocale: boolean,
): string[] => {
  const decimalCount = includeDecimals ? decimalPrecision : 0;
  const parsedNumber = parseFloat(`${Math.max(number, 0)}`).toFixed(decimalCount);
  const numberToFormat = formatLocale ? parseFloat(parsedNumber).toLocaleString(undefined, { minimumFractionDigits: includeDecimals ? decimalPrecision : 0 }) : parsedNumber;
  return numberToFormat.split('').reverse();
}

export default formatForDisplay;