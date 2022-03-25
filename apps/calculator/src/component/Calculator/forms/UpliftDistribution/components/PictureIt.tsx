import * as React from 'react';
import cx from 'classnames';
import { ReactComponent as Close } from '@redbull/common/icons/cross.svg';
import { useNumberParser } from '@redbull/common';

import { useTranslation } from 'react-i18next';
import FullscreenButton from '../../../components/FullscreenButton';
import { UpliftDistributionForm } from '../store/type';
import { useTypedSelector } from '../../../../../store';
import { intlUnitOptions, intlCurrencyOptions } from '../../../shared/config';

import stylesPreview from './PictureIt.module.scss';
import styles from '../../../Calculator.module.scss';

type Props = {
  values: UpliftDistributionForm;
};
const PictureIt = ({ values }: Props) => {
  const { t } = useTranslation();

  const {
    estAnnualProfit,
    estAnnualSales,
    estWeeklySales,
    variant,
    selected,
  } = values;

  const [fullScreen, setFullScreen] = React.useState(false);

  const currency = useTypedSelector(
    (state) => state.calculator.selectedCurrency
  );

  const [, formatNumber] = useNumberParser(
    (currency === 'EUR' && 'de-DE') || undefined
  );

  return (
    <div className={styles.row}>
      <div className={styles.col12}>
        <div
          className={cx(
            stylesPreview.preview,
            fullScreen && stylesPreview.fullscreen,
            selected && stylesPreview[selected.theme]
          )}
          style={{ backgroundColor: selected?.product.backgroundColor }}
        >
          {fullScreen && (
            <Close
              className={stylesPreview.closebutton}
              onClick={() => setFullScreen(false)}
            />
          )}
          <div className={cx(stylesPreview.column, stylesPreview.product)}>
            <img
              alt={variant?.value}
              className={stylesPreview.image}
              src={selected?.image}
            />
          </div>
          <div className={cx(stylesPreview.column, stylesPreview.result)}>
            <div className={stylesPreview.column}>
              <div className={stylesPreview.sales}>
                <div className={stylesPreview.title}>
                  {t('inputs.estWeeklySales')}
                </div>
                <div className={stylesPreview.value}>
                  {formatNumber(estWeeklySales, intlUnitOptions)}
                </div>
              </div>
            </div>

            <div className={stylesPreview.column}>
              <div className={stylesPreview.sales}>
                <div className={stylesPreview.title}>
                  {t('inputs.estAnnualValue')}
                </div>
                <div className={stylesPreview.value}>
                  {formatNumber(estAnnualSales, {
                    ...intlCurrencyOptions,
                    ...(currency && { style: 'currency', currency }),
                  })}
                </div>
              </div>
            </div>

            <div className={stylesPreview.column}>
              <div className={stylesPreview.sales}>
                <div className={stylesPreview.title}>
                  {t('inputs.estAnnualIncrementalValue')}
                </div>
                <div className={stylesPreview.value}>
                  {formatNumber(estAnnualProfit, {
                    ...intlCurrencyOptions,
                    ...(currency && { style: 'currency', currency }),
                  })}
                </div>
              </div>
            </div>
            {!fullScreen && (
              <FullscreenButton
                className={stylesPreview.fullscreenButton}
                onClick={() => setFullScreen(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureIt;
