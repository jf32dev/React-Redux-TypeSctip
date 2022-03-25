import * as React from 'react';
import { ReactComponent as UpliftDistribution } from '@redbull/common/icons/calc-uplift.svg';
import { ReactComponent as UpliftSalesDriver } from '@redbull/common/icons/calc-sales-driver.svg';
import { ReactComponent as TradeUp } from '@redbull/common/icons/calc-trade-up.svg';
import { Icons } from './type';

const calculatorIcons: Icons = {
  TradeUp: <TradeUp />,
  UpliftDistribution: <UpliftDistribution />,
  UpliftSalesDriver: <UpliftSalesDriver />,
};

export const getCalculatorIcon = (name: string) => {
  const iconName = name.replace(/\s/g, '');
  return calculatorIcons[iconName as keyof Icons];
};
