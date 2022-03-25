import { CountryCode } from '@redbull/common';
import { calculatorCollection } from './config';

export type CalculatorType = typeof calculatorCollection[number];

export interface CalculatorData {
  id: string;
  country: string;
  name: string;
  countryCode: CountryCode;
}
