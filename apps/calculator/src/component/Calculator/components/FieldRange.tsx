import * as React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Range } from '@redbull/components';
import { useNumberParser } from '@redbull/common';
import { FieldState } from 'final-form';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../../store';

type Props = {
  currencySymbol?: any;
  isCurrency?: boolean;
  isPercentage?: boolean;
  allowDecimal?: boolean;
  label: string;
  max?: number;
  min?: number;
  name: string;
  initialValue?: any;
};

const FieldRange = ({
  currencySymbol,
  isCurrency,
  isPercentage,
  allowDecimal = true,
  initialValue = 0,
  label,
  max = 10,
  min = 0,
  name,
}: Props) => {
  const { t } = useTranslation();
  const currency = useTypedSelector(
    (state) => state.calculator.selectedCurrency
  );
  const [, , toNumber] = useNumberParser(
    (currency === 'EUR' && 'de-DE') || undefined
  );

  const validate = (
    value: number,
    allValues: any,
    meta?: FieldState<number>
  ) => {
    if (!meta?.pristine) {
      const numberValue = toNumber(value);
      if (!allowDecimal && !/^\d*$/.test(`${value}`)) {
        return t('inputMessages.enterValidNumber');
      }
      if (allowDecimal && !/^[0-9,.]*$/.test(`${value}`)) {
        return t('inputMessages.enterValidNumber');
      }
      if (numberValue < min) {
        return `${t('inputMessages.lowestPossibleValue')} ${min}.`;
      }
      if (numberValue > max) {
        return `${t('inputMessages.lowestPossibleValue')} ${max}.`;
      }
    }

    return undefined;
  };

  return (
    <Field<number> initialValue={initialValue} name={name} validate={validate}>
      {({ input, meta }: FieldRenderProps<number, any>) => (
        <Range
          allowDecimal={allowDecimal}
          currencySymbol={currencySymbol}
          error={meta.touched && meta.error}
          errorMessage={meta.error}
          eurLocale={currency === 'EUR' ? 'de-DE' : undefined}
          isCurrency={isCurrency}
          isPercentage={isPercentage}
          label={label}
          max={max}
          min={min}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...input}
        />
      )}
    </Field>
  );
};

export default FieldRange;
