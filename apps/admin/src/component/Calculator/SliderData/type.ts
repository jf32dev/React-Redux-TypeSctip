import { CalculatorType } from '../../../api/services/calculator/type';
import { SliderData } from '../../../api/services/slider/type';
import { SelectOption } from '../type';

export interface RouteParams {
  calcId: string;
  calcType: CalculatorType;
}

export type SliderFormRow = Pick<
  SliderData,
  'calculatorId' | 'defaultValue' | 'id' | 'min' | 'max' | 'sliderName'
> & {
  unit: SelectOption;
};

export type FormValues = {
  [key: string]: SliderFormRow;
};
