import * as React from 'react';

import { CardContainer } from '@redbull/components';
import UpliftDistribution from '../forms/UpliftDistribution';
import TradeUp from '../forms/TradeUp';
import UpliftSalesDriver from '../forms/UpliftSalesDriver';

import styles from '../Calculator.module.scss';

type Props = {
  type: string;
};

const CalculatorContent = ({ type }: Props) => {
  let calculator = <UpliftDistribution />;

  switch (type) {
    case 'uplift-distribution':
      calculator = <UpliftDistribution />;
      break;
    case 'uplift-sales-driver':
      calculator = <UpliftSalesDriver />;
      break;
    case 'trade-up':
      calculator = <TradeUp />;
      break;
  }

  return <CardContainer className={styles.card}>{calculator}</CardContainer>;
};

export default CalculatorContent;
