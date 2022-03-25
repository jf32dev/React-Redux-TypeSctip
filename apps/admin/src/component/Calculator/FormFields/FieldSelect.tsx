import * as React from 'react';
import { find } from 'lodash';
import { Field, FieldRenderProps, FormSpy } from 'react-final-form';
import { ValueType } from 'react-select';
import { Select } from '@redbull/components';

type SelectValue = {
  label: string;
  value: string;
};

type Props = {
  disabled?: boolean;
  defaultValue?: SelectValue;
  invalidOnPristine?: boolean;
  isClearable?: boolean;
  label?: string;
  name: string;
  noErrorMessage?: boolean;
  options: any[];
  required?: boolean;
  searchable?: boolean;
  setIsFiltered?: (name: string, value: SelectValue | null) => void;
  setValue: (name: string, value: SelectValue | null) => void;
};

const FieldSelect = ({
  disabled,
  defaultValue,
  invalidOnPristine,
  isClearable = true,
  label,
  name,
  noErrorMessage,
  options,
  required,
  searchable,
  setIsFiltered,
  setValue,
}: Props) => {
  const validate = (option: ValueType<SelectValue>) => {
    if (!option) {
      return 'This field is required.';
    }
    return undefined;
  };

  const handleInputChange = (val: any, onChange: any) => {
    onChange(val);
    setIsFiltered && setIsFiltered(name, val);
  };

  // if options has changed and the selected value
  // is not available anymore, clear fields value
  const handleCheckSelectedField = (values: any) => {
    if (!find(options, values[name]) || disabled) {
      setValue(name, null);
      setIsFiltered && setIsFiltered(name, null);
    }
  };

  React.useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
      setIsFiltered && setIsFiltered(name, defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <>
      <Field<SelectValue> name={name} validate={validate}>
        {({ input, meta }: FieldRenderProps<SelectValue, any>) => {
          let invalid = meta.touched && meta.error && !disabled;
          if (invalidOnPristine) {
            invalid = !meta.pristine && meta.error && !disabled;
          }
          return (
            <Select
              errorMessage={!noErrorMessage && meta.error}
              id={name}
              invalid={invalid}
              isClearable={isClearable}
              isDisabled={disabled}
              isSearchable={searchable}
              label={label}
              options={options}
              placeholder="Please select..."
              required={required}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...input}
              onChange={(val) => handleInputChange(val, input.onChange)}
            />
          );
        }}
      </Field>
      <FormSpy
        subscription={{ dirtyFields: true, values: true }}
        onChange={({ dirtyFields, values }) => {
          if (dirtyFields[name]) {
            handleCheckSelectedField(values);
          }
        }}
      />
    </>
  );
};

export default FieldSelect;
