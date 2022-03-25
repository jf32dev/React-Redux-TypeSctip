import * as React from 'react';
import { getCurrencySymbol } from '@redbull/common';

import { useTranslation } from 'react-i18next';
import FieldSelect from '../../../components/FieldSelect';
import FieldRange from '../../../components/FieldRange';
import { setSelectOptions } from '../../../store/form/actions';
import { formatSelectData } from '../utils/utils';
import { TradeUpCalculatorContext } from '../store/context';

import { Product, TradeUpForm } from '../store/type';
import { useTypedSelector } from '../../../../../store';
import { Config, TSetValue } from '../../../shared/type';

import styles from '../../../Calculator.module.scss';

type TEnterPricing = {
  config: Record<string, Exclude<Config, 'name'>>;
  fileData: Product[] | null;
  setValue: TSetValue<TradeUpForm>;
  values: TradeUpForm;
};
const EnterDetails = ({
  config,
  fileData,
  setValue,
  values,
}: TEnterPricing) => {
  const { t } = useTranslation();
  const { selectedCurrency, selectedCountry } = useTypedSelector(
    (state) => state.calculator
  );
  const { type } = values;
  const {
    state: { selectOptions },
    dispatch,
  } = React.useContext(TradeUpCalculatorContext);

  React.useEffect(() => {
    // set only the first time after mounting once fileData have been received
    if (fileData && !type) {
      const formattedSelectData = formatSelectData(fileData);
      formattedSelectData.map((select) => dispatch(setSelectOptions(select)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  React.useEffect(() => {
    setValue('type', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedCurrency]);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col6}>
          <FieldSelect
            label={t('inputs.selectChannel')}
            name="type"
            options={selectOptions.type}
            searchable={selectOptions.type.length > 5}
            setValue={setValue as any}
            required
          />
        </div>
        <div className={styles.col6} />
      </div>
      <div className={styles.row}>
        <div className={styles.col6}>
          <FieldRange
            label={t('inputs.shelfPrice250')}
            max={config?.shelfPrice?.max}
            min={config?.shelfPrice?.min}
            name="shelfPrice"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(config.shelfPrice?.units === 'currency' &&
              selectedCurrency && {
                currencySymbol: getCurrencySymbol(selectedCurrency),
                isCurrency: true,
              })}
          />
        </div>
        <div className={styles.col6} />
      </div>
    </>
  );
};

export default EnterDetails;
