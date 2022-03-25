import * as React from 'react';
import cx from 'classnames';

import { ReactComponent as Close } from '@redbull/common/icons/cross.svg';
import { useNumberParser } from '@redbull/common';

import FullscreenButton from '../../../components/FullscreenButton';
import { TradeUpForm } from '../store/type';
import { size } from '../utils/config';
import { useTypedSelector } from '../../../../../store';
import { intlCurrencyOptions } from '../../../shared/config';

import RB250Single from '../../../../../images/250ml.png';
import RB355Single from '../../../../../images/355ml.png';
import RB473Single from '../../../../../images/473ml.png';

import previewStyles from './PictureIt.module.scss';
import styles from '../../../Calculator.module.scss';

type Props = {
  values: TradeUpForm;
};
const PictureIt = ({ values }: Props) => {
  const {
    shelfPrice,
    mediumShelfPrice,
    largeShelfPrice,
    shelfPricePerLitre,
    mediumShelfPricePerLitre,
    largeShelfPricePerLitre,
    selected,
  } = values;

  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const currency = useTypedSelector(
    (state) => state.calculator.selectedCurrency
  );
  const [, formatNumber, toNumber] = useNumberParser(
    (currency === 'EUR' && 'de-DE') || undefined
  );

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div
          className={cx(
            previewStyles.preview,
            isFullscreen && previewStyles.fullscreen,
            selected && previewStyles[selected.theme]
          )}
          style={{ backgroundColor: selected?.backgroundColor }}
        >
          {isFullscreen && (
            <Close
              className={previewStyles.closebutton}
              onClick={() => setIsFullscreen(false)}
            />
          )}
          <div className={cx(previewStyles.column, previewStyles.product)}>
            <img
              alt={`${size.regular}ml`}
              className={previewStyles.imageRegular}
              src={RB250Single}
            />
            <img
              alt={`${size.medium}ml`}
              className={previewStyles.imageMedium}
              src={RB355Single}
            />
            <img
              alt={`${size.large}ml`}
              className={previewStyles.imageLarge}
              src={RB473Single}
            />
          </div>
          <div className={cx(previewStyles.column, previewStyles.summary)}>
            <div className={previewStyles.column}>
              <div className={previewStyles.result}>
                <div className={previewStyles.title}>{size.regular}ml</div>
                <div className={previewStyles.value}>
                  {formatNumber(toNumber(shelfPrice), {
                    ...intlCurrencyOptions,
                    ...(currency && { style: 'currency', currency }),
                  })}
                </div>
                <div className={previewStyles.description}>
                  {formatNumber(shelfPricePerLitre, {
                    ...intlCurrencyOptions,
                    ...(currency && { style: 'currency', currency }),
                  })}
                  /L
                </div>
              </div>
            </div>
            <div className={previewStyles.column}>
              <div className={previewStyles.result}>
                <div className={previewStyles.title}>{size.medium}ml</div>
                <div className={previewStyles.value}>
                  {formatNumber(mediumShelfPrice, {
                    ...intlCurrencyOptions,
                    ...(currency && { style: 'currency', currency }),
                  })}
                </div>
                <div className={previewStyles.description}>
                  {formatNumber(mediumShelfPricePerLitre, {
                    ...intlCurrencyOptions,
                    ...(currency && { style: 'currency', currency }),
                  })}
                  /L
                </div>
              </div>
            </div>
            <div className={previewStyles.column}>
              <div className={previewStyles.result}>
                <div className={previewStyles.title}>{size.large}ml</div>
                <div className={previewStyles.value}>
                  {formatNumber(largeShelfPrice, {
                    ...intlCurrencyOptions,
                    ...(currency && { style: 'currency', currency }),
                  })}
                </div>
                <div className={previewStyles.description}>
                  {formatNumber(largeShelfPricePerLitre, {
                    ...intlCurrencyOptions,
                    ...(currency && { style: 'currency', currency }),
                  })}
                  /L
                </div>
              </div>
            </div>
          </div>
          {!isFullscreen && (
            <FullscreenButton
              className={previewStyles.fullscreenButton}
              onClick={() => setIsFullscreen(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PictureIt;
