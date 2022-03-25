import { CountryCode } from '@redbull/common';
import { CalculatorType } from 'src/api/services/calculator/type';
import {
  TradeUpBase,
  UpliftDistributionBase,
  UpliftSalesDriverBase,
} from '../../../api/services/product/type';
import { SelectOption } from '../type';

export type UpliftDistributionForm = Pick<
  UpliftDistributionBase,
  'backgroundColor' | 'taxes' | 'unitPerCase'
> & {
  calculatorId: number;
  country: string;
  currency: SelectOption;
  fileId: number;
  id: number;
  image: File | string;
  imageServer: string;
  imageHub: string;
  pack: SelectOption;
  size: SelectOption;
  type: SelectOption;
  variant: SelectOption;
  preview: string;
  formType: 'uplift-distribution';
};

export type UpliftSalesDriverForm = Pick<
  UpliftSalesDriverBase,
  'backgroundColor' | 'unitPerCase' | 'taxes'
> & {
  calculatorId: number;
  country: string;
  currency: SelectOption;
  fileId: number;
  id: number;
  image: File | string;
  imageServer: string;
  imageHub: string;
  type: SelectOption;
  salesDriver: SelectOption;
  preview: string;
  formType: 'uplift-sales-driver';
};

export type TradeUpForm = Pick<
  TradeUpBase,
  'backgroundColor' | 'multiplier355' | 'multipler473'
> & {
  calculatorId: number;
  country: string;
  id: string;
  type: SelectOption;
  formType: 'trade-up';
};

export interface FormRouteParams {
  action: 'add' | 'edit';
  calcType: CalculatorType;
  country: CountryCode;
  productId?: string;
  calcId: string;
}

export type ProductFormType =
  | UpliftSalesDriverForm
  | UpliftDistributionForm
  | TradeUpForm;
