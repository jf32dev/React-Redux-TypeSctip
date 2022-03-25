import * as React from 'react';
import { includes } from 'lodash';

import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../../../../store';
import FieldSelect from '../../../components/FieldSelect';

import { setSelectOptions } from '../../../store/form/actions';
import { UpliftSalesContext } from '../store/context';
import { Driver, DriverForm, QueryFormat } from '../store/type';
import { formatSelectData } from '../utils/utils';
import { TSetValue } from '../../../shared/type';
import { filterDataByQuery } from '../../../shared/utils';

import styles from '../../../Calculator.module.scss';

type Props = {
  fileData: Driver[] | null;
  setValue: TSetValue<DriverForm>;
  values: DriverForm;
};
const EnterDetails = ({ fileData, setValue, values }: Props) => {
  const { t } = useTranslation();
  const { type, salesDriver } = values;

  const {
    state: { selectOptions },
    dispatch,
  } = React.useContext(UpliftSalesContext);

  const { selectedCurrency, selectedCountry } = useTypedSelector(
    (state) => state.calculator
  );

  React.useEffect(() => {
    // set only the first time after mounting once fileData have been received
    if (fileData && !type) {
      const formattedSelectData = formatSelectData(fileData);
      formattedSelectData.map((select) => dispatch(setSelectOptions(select)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  React.useEffect(() => {
    const query: QueryFormat = { ...(type && { typeValue: type.value }) };
    const data = filterDataByQuery<Driver, QueryFormat>(fileData || [], query);
    const formattedSelectData = formatSelectData(data).filter(
      (s) => !includes(Object.keys(query), s.name)
    );
    formattedSelectData.map((select) => {
      return dispatch(setSelectOptions(select));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, salesDriver]);

  React.useEffect(() => {
    setValue('type', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency, selectedCountry]);

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
            label={t('inputs.selectSalesDriver')}
            name="salesDriver"
            options={selectOptions.salesDriver}
            searchable={selectOptions.salesDriver.length > 5}
            setValue={setValue as any}
            required
          />
        </div>
      </div>
    </>
  );
};

export default EnterDetails;
