import { CurrencyCode } from '@redbull/common';

/**
 * Format value to string number with fraction digits.
 * @param fn is a function to provide an addtional formatting after value is formatted to string number
 */
export default function (
  value: any,
  fractionDigit: number = 2,
  currency?: CurrencyCode | null
) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: fractionDigit,
    minimumFractionDigits: fractionDigit,
    ...(currency && { style: 'currency', currency }),
  }).format(Number(value) || 0);
}

// export function
