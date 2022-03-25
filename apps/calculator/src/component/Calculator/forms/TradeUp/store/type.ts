/* eslint-disable camelcase */
import { CountryCode, CurrencyCode } from '@redbull/common';
import { TColourTheme } from '@redbull/components';
import { SelectOption } from '../../../shared/type';

export const SET_SELECT_OPTIONS = 'calculator/setSelectOptions';
export const SET_PREVIOUS_VALUE = 'calculator/setPreviousValue';

export interface TradeUpForm {
  largeShelfPrice?: number;
  largeShelfPricePerLitre?: number;
  mediumShelfPrice?: number;
  mediumShelfPricePerLitre?: number;
  shelfPrice: string;
  shelfPricePerLitre?: number;
  type?: {
    label: string;
    value: string;
  };
  selected?: {
    backgroundColor: string;
    theme: TColourTheme;
  };
}

export interface Product {
  backgroundColor: string;
  calculatorId: string;
  country: CountryCode;
  currency: string;
  currencyValue: CurrencyCode;
  id: string;
  multiplier355: number;
  multiplier473: number;
  type: string;
  typeValue: string;
}

export interface SelectOptionsState {
  type: SelectOption[];
}

export interface PreviousValuesState {
  type: string | null;
}

export type QueryFormat = Partial<Pick<Product, 'typeValue'>>;
