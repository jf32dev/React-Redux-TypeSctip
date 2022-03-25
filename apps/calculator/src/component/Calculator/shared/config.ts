import { ValueType } from 'react-select';
import { TColourTheme } from '@redbull/components';
import { Product as UpliftDistributionProduct } from '../forms/UpliftDistribution/store/type';
import { Product as TradeUpProduct } from '../forms/TradeUp/store/type';
import { Driver } from '../forms/UpliftSalesDriver/store/type';

export const DEFAULT_COLOUR_THEME: TColourTheme = 'dark';

export enum ECalculatorType {
  UPLIFT_DISTRIBUTION = 'uplift-distribution',
  UPLIFT_SALES_DRIVER = 'uplift-sales-driver',
  TRADE_UP = 'trade-up',
}

export enum ECalculatorChannelIdByCountry {
  DE = 170105,
  IT = 170109,
  ZA = 170111,
}

export const intlCurrencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
} as Intl.NumberFormatOptions;

export const intlUnitOptions = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
} as Intl.NumberFormatOptions;

export type SelectValue = { label: string; value: string };
export type SelectOption = ValueType<SelectValue> | null;

export type ProductType = TradeUpProduct | UpliftDistributionProduct | Driver;
