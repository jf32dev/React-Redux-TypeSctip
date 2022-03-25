import { CalculatorType } from '../../../api/services/calculator/type';

export const calculatorHeader: Record<CalculatorType, string[]> = {
  'uplift-distribution': [
    'Currency',
    'Type',
    'Variant',
    'Size',
    'Pack',
    'Unit/Case',
    'Taxes',
    'Image',
    'Background Color',
  ],
  'trade-up': ['Currency', 'Type', '355ml', '473ml', 'Background Color'],
  'uplift-sales-driver': [
    'Currency',
    'Type',
    'Sales Driver',
    'Unit / Case',
    'Taxes',
    'Image',
    'Background Color',
  ],
};
