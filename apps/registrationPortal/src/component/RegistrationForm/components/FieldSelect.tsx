import * as React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { ValueType } from 'react-select';

import { Select } from '@redbull/components';

type SelectValue = {
  label: string;
  value: string;
};

type Props = {
  disabled?: boolean;
  label: string;
  name: string;
  options: SelectValue[];
  required?: boolean;
  searchable?: boolean;
  errorMessage?: string;
  placeholder?: string;
  onChange?: (
    value: ValueType<{
      label: string;
      value: string;
    }>
  ) => void;
};

const FieldSelect = ({
  disabled,
  label,
  name,
  options,
  required,
  searchable,
  errorMessage,
  onChange,
  placeholder,
}: Props) => {
  const validate = (option: ValueType<SelectValue>) => {
    if (required && !option) {
      return errorMessage || 'This field is required.';
    }
    return undefined;
  };

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
          placeholder={placeholder || 'Please select...'}
          required={required}
          isClearable
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...input}
          onChange={onChange || input.onChange}
        />
      )}
    </Field>
  );
};

export default FieldSelect;
