import { CalculatorType } from '../../api/services/calculator/type';

export type Breadcrumb = {
  label: string;
  action?: 'add' | 'edit';
  calcId?: string;
  country?: string;
  calcType?: CalculatorType;
  dataType?: 'data' | 'slider';
  disabled?: boolean;
};
