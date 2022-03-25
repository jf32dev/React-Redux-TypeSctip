/* eslint-disable camelcase */
import { CountryCode, CurrencyCode } from '@redbull/common';
import { TColourTheme } from '@redbull/components';
import { SelectOption } from '../../../shared/type';

export const SET_SELECT_OPTIONS = 'calculator/setSelectOptions';
export const SET_PREVIOUS_VALUE = 'calculator/setPreviousValue';

export interface DriverForm {
  caseDeal: string;
  costCase: string;
  estUplift: string;
  currentWeeklySales: string;
  customerSellingPrice: string;
  estAnnualProfit?: number;
  estAnnualSales?: number;
  estWeeklySales?: number;
  selected?: {
    product: Driver;
    image: string;
    theme: TColourTheme;
  };
  type?: {
    label: string;
    value: string;
  };
  salesDriver?: {
    label: string;
    value: string;
  };
}

/** Format of Driver Tool that is coming from the API - CSV file */
export interface Driver {
  backgroundColor: string;
  calculatorId: string;
  country: CountryCode;
  currency: string;
  currencyValue: CurrencyCode;
  fileId: string;
  id: string;
  image: string;
  imageHub: string;
  imageServer: string;
  salesDriver: string;
  salesDriverValue: string;
  taxes: number;
  type: string;
  typeValue: string;
  unitPerCase: number;
}
export interface SelectOptionsState {
  type: SelectOption[];
  salesDriver: SelectOption[];
}

export interface PreviousValuesState {
  type: string | null;
  salesDriver: string | null;
}

export type QueryFormat = Partial<
  Pick<Driver, 'typeValue' | 'salesDriverValue'>
>;
