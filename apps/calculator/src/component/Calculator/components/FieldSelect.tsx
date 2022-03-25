import * as React from 'react';
import { find } from 'lodash';
import { Field, useFormState, FieldRenderProps } from 'react-final-form';
import { ValueType } from 'react-select';

import { Select } from '@redbull/components';

import { useTranslation } from 'react-i18next';
import styles from '../Calculator.module.scss';

type SelectValue = {
  label: string;
  value: string;
};

type Props = {
  disabled?: boolean;
  label: string;
  name: string;
  options: any[];
  required?: boolean;
  searchable?: boolean;
  setIsFiltered?: (name: string, value: SelectValue | null) => void;
  setValue: (name: string, value: SelectValue | null) => void;
};

const FieldSelect = ({
  disabled,
  label,
  name,
  options,
  required,
  searchable,
  setIsFiltered,
  setValue,
}: Props) => {
  const { t } = useTranslation();
  const formState = useFormState();

  const validate = (option: ValueType<SelectValue>) => {
    if (!option) {
      return t('inputMessages.requiredField');
    }
    return undefined;
  };

  const handleInputChange = (val: any, onChange: any) => {
    onChange(val);
    setIsFiltered && setIsFiltered(name, val);
  };

  React.useEffect(() => {
    // if options has changed and the selected value
    // is not available anymore, clear fields value
    if (!find(options, formState.values[name]) || disabled) {
      setValue(name, null);
      setIsFiltered && setIsFiltered(name, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, disabled]);

  return (
    <Field<SelectValue> name={name} validate={validate}>
      {({ input, meta }: FieldRenderProps<SelectValue, any>) => (
        <Select
          errorMessage={meta.error}
          id={name}
          invalid={meta.touched && meta.error && !disabled}
          isDisabled={disabled}
          isSearchable={searchable}
          label={label}
          options={options}
          placeholder={t('inputMessages.pleaseSelect')}
          required={required}
          isClearable
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...input}
          className={styles.select}
          onChange={(val) => handleInputChange(val, input.onChange)}
        />
      )}
    </Field>
  );
};

export default FieldSelect;
