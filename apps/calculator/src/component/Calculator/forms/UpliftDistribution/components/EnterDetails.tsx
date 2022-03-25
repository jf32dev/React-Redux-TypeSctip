import * as React from 'react';
import { includes } from 'lodash';

import { useTranslation } from 'react-i18next';
import FieldSelect from '../../../components/FieldSelect';

import { setSelectOptions } from '../../../store/form/actions';
import { UpliftCalculatorContext } from '../store/context';
import { formatSelectData } from '../utils/utils';
import { Product, QueryFormat, UpliftDistributionForm } from '../store/type';
import { TSetValue } from '../../../shared/type';
import { filterDataByQuery } from '../../../shared/utils';
import { useTypedSelector } from '../../../../../store';

import styles from '../../../Calculator.module.scss';

type TEnterDetails = {
  fileData: Product[] | null;
  setValue: TSetValue<UpliftDistributionForm>;
  values: UpliftDistributionForm;
};
const EnterDetails = ({ fileData, setValue, values }: TEnterDetails) => {
  const { t } = useTranslation();
  const { type, variant, size, pack } = values;

  const { selectedCurrency, selectedCountry } = useTypedSelector(
    (state) => state.calculator
  );

  const {
    state: { selectOptions },
    dispatch,
  } = React.useContext(UpliftCalculatorContext);

  React.useEffect(() => {
    // set only the first time after mounting once fileData have been received
    if (fileData && !type) {
      const formattedSelectData = formatSelectData(fileData);
      formattedSelectData.map((select) => dispatch(setSelectOptions(select)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  React.useEffect(() => {
    const query: QueryFormat = {
      ...(type && { typeValue: type?.value }),
      ...(variant && { variantValue: variant?.value }),
      ...(size && { sizeValue: size?.value }),
    };

    const data = filterDataByQuery<Product, QueryFormat>(fileData || [], query);
    const formattedSelectData = formatSelectData(data).filter(
      (s) => !includes(Object.keys(query), s.name)
    );
    formattedSelectData.map((select) => {
      return dispatch(setSelectOptions(select));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, variant, size, pack]);

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
        <div className={styles.col6}>
          <FieldSelect
            disabled={!type}
            label={t('inputs.selectVariant')}
            name="variant"
            options={selectOptions.variant}
            searchable={selectOptions.variant.length > 5}
            setValue={setValue as any}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col6}>
          <FieldSelect
            disabled={!type || !variant}
            label={t('inputs.selectFillingSize')}
            name="size"
            options={selectOptions.size}
            searchable={selectOptions.size.length > 5}
            setValue={setValue as any}
            required
          />
        </div>
        <div className={styles.col6}>
          <FieldSelect
            disabled={!type || !variant || !size}
            label={t('inputs.selectPack')}
            name="pack"
            options={selectOptions.pack}
            searchable={selectOptions.pack.length > 5}
            setValue={setValue as any}
            required
          />
        </div>
      </div>
    </>
  );
};

export default EnterDetails;
