import * as React from 'react';
import cx from 'classnames';

import { useNumberParser } from '@redbull/common';
import { useTranslation } from 'react-i18next';
import { DriverForm } from '../store/type';

import styles from '../../../Calculator.module.scss';
import { TSetValue } from '../../../shared/type';
import { useTypedSelector } from '../../../../../store';
import { intlUnitOptions, intlCurrencyOptions } from '../../../shared/config';

type TSummary = {
  setValue: TSetValue<DriverForm>;
  values: DriverForm;
};
const Summary = ({ values, setValue }: TSummary) => {
  const { t } = useTranslation();
  const currency = useTypedSelector(
    (state) => state.calculator.selectedCurrency
  );
  const [, formatNumber, toNumber] = useNumberParser(
    (currency === 'EUR' && 'de-DE') || undefined
  );
  const {
    selected,
    caseDeal: caseDealInput,
    costCase: costCaseInput,
    customerSellingPrice: sellingPriceInput,
    estUplift: upliftInput,
    currentWeeklySales: currentWeeklySalesInput,
  } = values;

  const sellingPrice = toNumber(sellingPriceInput || 0); // user input in dollars
  const caseDeal = toNumber(caseDealInput || 0); // user input in dollars
  const costPerCase = toNumber(costCaseInput || 0); // user input in dollars
  const uplift = toNumber(upliftInput || 0); // user input in percents
  const currentWeeklySales = toNumber(currentWeeklySalesInput || 0); // user input in units

  // TODO: Might need to move this to a function / hook since the calculation is the same as the uplift distribution
  const unitsPerCase = selected?.product.unitPerCase || 0;
  const tax = selected?.product.taxes || 0;

  const newTotalCostCase = costPerCase - caseDeal;
  const taxes = newTotalCostCase * (tax / 100); // tax is in percentage
  const totalCostCase = newTotalCostCase + taxes;
  const unitCost = totalCostCase / unitsPerCase;
  const cashMargin = (sellingPrice - unitCost) * 0.9;
  const cashMarginPercentage =
    ((100 / sellingPrice) * (cashMargin * 1.1)) / 100;

  const estWeeklySales =
    currentWeeklySales + (currentWeeklySales * uplift) / 100; // uplift is in percentage
  const estAnnualSales = sellingPrice * estWeeklySales * 52; // weeks in a year
  const estAnnualProfit = cashMarginPercentage * estAnnualSales;

  React.useEffect(() => {
    setValue('estWeeklySales', estWeeklySales);
    setValue('estAnnualSales', estAnnualSales);
    setValue('estAnnualProfit', estAnnualProfit);
  }, [estAnnualProfit, estAnnualSales, estWeeklySales, setValue]);

  return (
    <>
      <div className={styles.row}>
        <div className={cx(styles.col6, styles.left)}>
          <p className={styles['summary-row']}>
            <span>{t('inputs.unitCase')}</span>
            <span>{formatNumber(unitsPerCase, intlUnitOptions)}</span>
          </p>
          <p className={styles['summary-row']}>
            <span>{t('inputs.costCase')}</span>
            <span>
              {formatNumber(costPerCase, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
          <p className={cx(styles['summary-row'], styles.bold)}>
            <span>{t('inputs.caseDeal')}</span>
            <span>
              {formatNumber(caseDeal, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
          <p className={styles['summary-row']}>
            <span>{t('inputs.newTotalCostCase')}</span>
            <span>
              {formatNumber(newTotalCostCase, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
          <p className={styles['summary-row']}>
            <span>{t('inputs.taxes')}</span>
            <span>
              {formatNumber(taxes, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
          <p className={styles['summary-row']}>
            <span>{t('inputs.totalCostCase')}</span>
            <span>
              {formatNumber(totalCostCase, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
          <p className={styles['summary-row']}>
            <span>{t('inputs.unitCost')}</span>
            <span>
              {formatNumber(unitCost, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
          <p className={cx(styles['summary-row'], styles.bold)}>
            <span>{t('inputs.customerSellingPrice')}</span>
            <span>
              {formatNumber(sellingPrice, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
        </div>
        <div className={cx(styles.col6, styles.right)}>
          <p className={styles['summary-row']}>
            <span>{t('inputs.cashMargin')}</span>
            <span>
              {formatNumber(cashMargin, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
          <p className={styles['summary-row']}>
            <span>{`${t('inputs.cashMargin')} %`}</span>
            <span>{formatNumber(cashMarginPercentage * 100)}</span>
          </p>
          <p className={cx(styles['summary-row'], styles.bold)}>
            <span>{`${t('inputs.estUplift')} %`}</span>
            <span>{formatNumber(uplift)}</span>
          </p>
          <p className={cx(styles['summary-row'], styles.bold)}>
            <span>{t('inputs.currentWeeklySales')}</span>
            <span>{formatNumber(currentWeeklySales, intlUnitOptions)}</span>
          </p>
          <p className={styles['summary-row']}>
            <span>{t('inputs.estWeeklySales')}</span>
            <span>{formatNumber(estWeeklySales, intlUnitOptions)}</span>
          </p>
          <p className={styles['summary-row']}>
            <span>{t('inputs.estAnnualValue')}</span>
            <span>
              {formatNumber(estAnnualSales, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
          <p className={styles['summary-row']}>
            <span>{t('inputs.estAnnualIncrementalValue')}</span>
            <span>
              {formatNumber(estAnnualProfit, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Summary;
