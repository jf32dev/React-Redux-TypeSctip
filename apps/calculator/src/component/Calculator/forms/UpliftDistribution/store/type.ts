/* eslint-disable camelcase */
import { CountryCode, CurrencyCode } from '@redbull/common';
import { TColourTheme } from '@redbull/components';
import { SelectOption } from '../../../shared/type';

export const SET_SELECT_OPTIONS = 'calculator/setSelectOptions';
export const SET_PREVIOUS_VALUE = 'calculator/setPreviousValue';

export interface UpliftDistributionForm {
  caseDeal: string;
  costCase: string;
  currentWeeklySales: string;
  customerSellingPrice: string;
  estAnnualProfit?: number;
  estAnnualSales?: number;
  estWeeklySales?: number;
  estUplift?: string;
  productImage?: string;
  selected?: {
    product: Product;
    image: string;
    theme: TColourTheme;
  };
  pack?: { label: string; value: string };
  size?: { label: string; value: string };
  type?: { label: string; value: string };
  variant?: { label: string; value: string };
}

export interface Product {
  backgroundColor: string;
  calculatorId: string;
  country: CountryCode;
  currency: string;
  currencyValue: CurrencyCode;
  fileId: string;
  image: string;
  imageHub: string;
  imageServer: string;
  pack: string;
  packValue: string;
  size: string;
  sizeValue: string;
  taxes: number;
  type: string;
  typeValue: string;
  unitPerCase: number;
  variant: string;
  variantValue: string;
}
export interface SelectOptionsState {
  type: SelectOption[];
  variant: SelectOption[];
  size: SelectOption[];
  pack: SelectOption[];
}

export interface PreviousValuesState {
  type: string | null;
  variant: string | null;
  size: string | null;
  pack: string | null;
}

export type QueryFormat = Partial<
  Pick<Product, 'typeValue' | 'variantValue' | 'packValue' | 'sizeValue'>
>;
