import { currencyList } from './currencyList';

export type CurrencyCode = typeof currencyList[number]['currencyCode'];
export type CurrencySymbol = typeof currencyList[number]['symbol'];
export type CountryCode = typeof currencyList[number]['countryCode'];

export const getCurrencySymbol = (
  code: CurrencyCode
): CurrencySymbol | undefined =>
  currencyList.find((c) => c.currencyCode === code)?.symbol;

export const getCurrencyCode = (
  currencyCode: CountryCode
): CurrencyCode | undefined =>
  currencyList.find((c) => c.countryCode === currencyCode)?.currencyCode;

export const hasCurrencySymbol = (currencyCode: CurrencyCode): boolean =>
  !!currencyList.find((c) => c.currencyCode === currencyCode);

export const hasCountryCode = (countryCode: CountryCode): boolean =>
  !!currencyList.find((c) => c.countryCode === countryCode);

export const getCountryName = (countryCode: CountryCode): string | undefined =>
  currencyList.find((c) => c.countryCode === countryCode)?.country;

// get symbol format.
export const formatter = (currencyCode: CurrencyCode) => {
  const fn = currencyList.find((c) => c.currencyCode === currencyCode);
  if (fn) {
    return fn.symbolFormat;
  }
  return null;
};

// Country Type Guards
export const isCountryCode = (code: string): code is CountryCode => {
  return hasCountryCode(code as any);
};
