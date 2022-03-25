import * as React from 'react';
import { getCurrencySymbol } from '@redbull/common';

import { useTranslation } from 'react-i18next';
import FieldRange from '../../../components/FieldRange';
import { useTypedSelector } from '../../../../../store';
import { Config } from '../../../shared/type';

import styles from '../../../Calculator.module.scss';

type TEnterPricing = {
  config: Record<string, Exclude<Config, 'name'>>;
};
const EnterPricing = ({ config }: TEnterPricing) => {
  const { t } = useTranslation();
  const currency = useTypedSelector(
    (state) => state.calculator.selectedCurrency
  );

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col6}>
          <FieldRange
            label={t('inputs.caseDeal')}
            max={config.caseDeal?.max}
            min={config.caseDeal?.min}
            name="caseDeal"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(config.caseDeal?.units === 'currency' &&
              currency && {
                currencySymbol: getCurrencySymbol(currency),
                isCurrency: true,
              })}
          />
        </div>
        <div className={styles.col6}>
          <FieldRange
            label={`${t('inputs.customerSellingPrice')} *`}
            max={config.customerSellingPrice?.max}
            min={config.customerSellingPrice?.min}
            name="customerSellingPrice"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(config.customerSellingPrice?.units === 'currency' &&
              currency && {
                currencySymbol: getCurrencySymbol(currency),
                isCurrency: true,
              })}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col6}>
          <FieldRange
            allowDecimal={false}
            label={`${t('inputs.estUplift')} %`}
            max={config.estUplift?.max}
            min={config.estUplift?.min}
            name="estUplift"
            isPercentage
          />
        </div>
        <div className={styles.col6}>
          <FieldRange
            allowDecimal={false}
            label={t('inputs.currentWeeklySales')}
            max={config.currentWeeklySales?.max}
            min={config.currentWeeklySales?.min}
            name="currentWeeklySales"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(config.currentWeeklySales?.units === 'currency' &&
              currency && {
                currencySymbol: getCurrencySymbol(currency),
                isCurrency: true,
              })}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col6}>
          <FieldRange
            label={`${t('inputs.costCase')}*`}
            max={config.costCase?.max}
            min={config.costCase?.min}
            name="costCase"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(config.costCase?.units === 'currency' &&
              currency && {
                currencySymbol: getCurrencySymbol(currency),
                isCurrency: true,
              })}
          />
        </div>
      </div>

      <span className={styles.note}>
        {t('inputMessages.priceProvidedByCustomer')}
      </span>
    </>
  );
};

export default EnterPricing;
