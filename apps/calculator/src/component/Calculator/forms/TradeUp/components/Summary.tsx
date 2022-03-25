import * as React from 'react';
import cx from 'classnames';

import { useNumberParser } from '@redbull/common';
import { getThemeByColour, TColourTheme } from '@redbull/components';

import { size } from '../utils/config';
import {
  DEFAULT_COLOUR_THEME,
  intlCurrencyOptions,
} from '../../../shared/config';
import { filterDataByQuery } from '../../../shared/utils';
import { TSetValue } from '../../../shared/type';

import { Product, TradeUpForm, QueryFormat } from '../store/type';
import { useTypedSelector } from '../../../../../store';

import styles from '../../../Calculator.module.scss';

type TSummary = {
  fileData: Product[] | null;
  setValue: TSetValue<
    TradeUpForm,
    number | { backgroundColor: string; theme: TColourTheme }
  >;
  values: TradeUpForm;
};
const Summary = ({ fileData, setValue, values }: TSummary) => {
  const currency = useTypedSelector(
    (state) => state.calculator.selectedCurrency
  );
  const [, formatNumber, toNumber] = useNumberParser(
    (currency === 'EUR' && 'de-DE') || undefined
  );

  const { type, shelfPrice } = values;

  const query: QueryFormat = {
    typeValue: type?.value,
  };

  const formattedShelfPrice = toNumber(shelfPrice);

  const selectedData = filterDataByQuery<Product>(fileData || [], query)[0];
  const theme =
    getThemeByColour(selectedData.backgroundColor) || DEFAULT_COLOUR_THEME;
  const medium = selectedData.multiplier355 || 0;
  const large = selectedData.multiplier473 || 0;

  /**
   * Trade up Formula
   *
   * ShelfPrice = 250ml can price
   * MediumShelfPrice (355ml) = ShelfPrice * x% increase
   * LargeShelfPrice (473ml) = ShelfPrice * y% increase
   *
   * ShelfPrice / L = 1000ml/250ml * ShelfPrice
   * MediumShelfPrice / L = 1000ml / 355ml * MediumShelfPrice
   * LargeShelfPrice / L = 1000ml / 473ml * LargeShelfPrice
   * x and y are variables depending on the type.
   */

  // medium percentage = 355ml percentage
  // large percentage = 473ml percentage

  const mediumShelfPrice = +(
    formattedShelfPrice * (medium ? medium / 100 + 1 : 0)
  ).toFixed(2);

  const largeShelfPrice = +(
    formattedShelfPrice * (large ? large / 100 + 1 : 0)
  ).toFixed(2);
  const shelfPricePerLitre = (1000 / size.regular) * formattedShelfPrice;
  const mediumShelfPricePerLitre = (1000 / size.medium) * mediumShelfPrice;
  const largeShelfPricePerLitre = (1000 / size.large) * largeShelfPrice;

  React.useEffect(() => {
    setValue('mediumShelfPrice', mediumShelfPrice);
    setValue('largeShelfPrice', largeShelfPrice);
    setValue('shelfPricePerLitre', shelfPricePerLitre);
    setValue('mediumShelfPricePerLitre', mediumShelfPricePerLitre);
    setValue('largeShelfPricePerLitre', largeShelfPricePerLitre);
    setValue('selected', {
      backgroundColor: selectedData.backgroundColor,
      theme,
    });
  }, [
    largeShelfPrice,
    largeShelfPricePerLitre,
    mediumShelfPrice,
    mediumShelfPricePerLitre,
    selectedData.backgroundColor,
    setValue,
    shelfPricePerLitre,
    theme,
  ]);

  return (
    <>
      <div className={styles.row}>
        <div className={cx(styles.col12)}>
          <p className={styles['summary-row']}>
            <span>Red Bull / Energy Drink {size.regular}ml</span>
            <span>
              {formatNumber(formattedShelfPrice, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
          <p className={styles['summary-row']}>
            <span>Red Bull / Energy Drink {size.medium}ml</span>
            <span>
              {formatNumber(mediumShelfPrice, {
                ...intlCurrencyOptions,
                ...(currency && { style: 'currency', currency }),
              })}
            </span>
          </p>
          <p className={styles['summary-row']}>
            <span>Red Bull / Energy Drink {size.large}ml</span>
            <span>
              {formatNumber(largeShelfPrice, {
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
