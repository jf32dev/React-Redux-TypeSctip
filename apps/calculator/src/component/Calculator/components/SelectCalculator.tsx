import * as React from 'react';
import cx from 'classnames';

import { CardContainer, Tile } from '@redbull/components';

import { ReactComponent as CalcUplift } from '@redbull/common/icons/calc-uplift.svg';
import { ReactComponent as CalcSalesDriver } from '@redbull/common/icons/calc-sales-driver.svg';
import { ReactComponent as CalcTradeUp } from '@redbull/common/icons/calc-trade-up.svg';

import { useTranslation } from 'react-i18next';
import styles from '../Calculator.module.scss';

type Props = {
  selected: string;
};

const SelectCalculator = ({ selected }: Props) => {
  const { t } = useTranslation();
  return (
    <CardContainer className={styles.card}>
      <div className={styles['select-calculator']}>
        <div className={styles.tiles}>
          <div className={styles.title}>{t('general.selectCalculator')}</div>
          <Tile
            className={cx(
              styles.tile,
              selected === 'uplift-distribution' && styles.active
            )}
            icon={<CalcUplift />}
            linkTo="/calculator/uplift-distribution"
            title={t('general.upliftDistribution')}
            type="navigation"
          />
          <Tile
            className={cx(
              styles.tile,
              selected === 'trade-up' && styles.active
            )}
            icon={<CalcTradeUp />}
            linkTo="/calculator/trade-up"
            title={t('general.tradeUp')}
            type="navigation"
          />
          <Tile
            className={cx(
              styles.tile,
              selected === 'uplift-sales-driver' && styles.active
            )}
            icon={<CalcSalesDriver />}
            linkTo="/calculator/uplift-sales-driver"
            title={t('general.upliftSalesDriver')}
            type="navigation"
          />
        </div>
      </div>
    </CardContainer>
  );
};

export default SelectCalculator;
