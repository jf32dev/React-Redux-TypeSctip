import * as React from 'react';

type TReturn = [
  (value: string, options?: Intl.NumberFormatOptions) => string,
  (value: number | undefined, options?: Intl.NumberFormatOptions) => string,
  (value: string | number) => number
];

/**
 *
 * @param locale
 */
const useNumberParser = (locale?: string): TReturn => {
  // get a sample of locale group separator and decimal separator
  const parts = React.useMemo(
    () => Intl.NumberFormat(locale).formatToParts(12345.6),
    [locale]
  );

  // create regex for group separator and decimal separator
  const groupSeparatorRegex = new RegExp(
    `[${parts.find((d) => d.type === 'group')!.value}]`,
    'g'
  );
  const decimalSeparator = parts.find((d) => d.type === 'decimal')!.value;
  const decimalSeparatorRegex = new RegExp(
    `[${parts.find((d) => d.type === 'decimal')!.value}]`,
    'g'
  );
  /**
   * Transform Intl String or Number to JS Number.
   * Example:
   * EU 2,00 -> 2.00
   * EU 2.000 -> 2000
   * EU 2.000,00 -> 2000.00
   *
   * AU 2,000 -> 2000
   * AU 2,000.00 -> 2000.00
   */
  const toNumber = React.useCallback(
    (value: string | number) => {
      return (
        Number(
          `${value}`
            .trim()
            .replace(groupSeparatorRegex || ',', '')
            .replace(decimalSeparatorRegex || '.', '.')
        ) || 0
      );
    },
    [decimalSeparatorRegex, groupSeparatorRegex]
  );

  /**
   * Transform Number from JS Number format to Intl format
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
   */
  const formatNumber = React.useCallback(
    (value: number | undefined, options?: Intl.NumberFormatOptions) =>
      Intl.NumberFormat(locale, options).format(value || 0),
    [locale]
  );

  /**
   * Format String Number to Intl String Number
   * Example:
   * EU '3000000.00' --> '3.000.000,00'
   * AU '3000000.00' --> '3,000,000.00'
   */
  const formatStringNumber = React.useCallback(
    (value: string, options?: Intl.NumberFormatOptions) => {
      const numberValue = toNumber(value);
      if (!numberValue) {
        return `${value}`;
      }

      // this separator is used for the input field
      // if user type `300,` the comma will not be ignored / gone
      // same goes with `300,00`
      let separator = null;
      const trailingZerosRegex = new RegExp(
        `[${decimalSeparator}]0{0,${options?.maximumFractionDigits || 3}}$`
      );
      if (`${value}`.match(trailingZerosRegex)) {
        separator = trailingZerosRegex.exec(`${value}`);
      }
      return formatNumber(numberValue, options).concat(
        separator ? separator[0] : ''
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  return [formatStringNumber, formatNumber, toNumber];
};

export default useNumberParser;
