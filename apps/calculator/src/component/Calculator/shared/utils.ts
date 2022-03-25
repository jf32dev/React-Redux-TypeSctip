import { filter, matches } from 'lodash';
import {
  findUniqueSet,
  CountryCode,
  CurrencyCode,
  getCurrencySymbol,
} from '@redbull/common';

import { ICountry } from '../../../store/calculator/type';

export const uniqueCurrencies = (currencies: CurrencyCode[]): CurrencyCode[] =>
  Array.from(findUniqueSet<CurrencyCode>(currencies));

export const filterDataByQuery = <T, Q = any>(data: T[], query: Q): T[] => {
  return filter(data, matches(query));
};

export const findSelectedCountry = (
  options: ICountry[],
  countryCode: CountryCode | null
) => {
  const country = options.find((opt) => opt.country === countryCode);
  if (country) {
    return formatCountryOption(country);
  }
  return null;
};

export const formatCountryOption = (option: ICountry) => ({
  label: option.countryName,
  value: option.country,
});

export const formatCurrencyOption = (option: CurrencyCode) => ({
  label: `${option} ${getCurrencySymbol(option)}`,
  value: option,
});
