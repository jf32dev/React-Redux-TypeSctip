import * as React from 'react';
import { Field } from 'react-final-form';
import { Input } from '@redbull/components';

type Props = {
  defaultValue?: string | number;
  errorMessage?: string;
  invalidMessage?: string;
  invalidOnPristine?: boolean;
  label?: string;
  name: string;
  noErrorMessage?: boolean;
  required?: boolean;
  setValue: (name: string, value: string) => void;
  type?: string;
  validation?: (value: any) => string | undefined;
  value?: string | number;
};

const FieldInput = ({
  defaultValue,
  errorMessage,
  invalidMessage,
  invalidOnPristine,
  label,
  name,
  noErrorMessage,
  required,
  setValue,
  type,
  validation,
}: Props) => {
  const handleReset = () => {
    setValue(name, '');
  };

  const validate = (val: string | number) => {
    if (!val && val !== 0) {
      return errorMessage || 'This field is required';
    }

    if (validation) {
      const message = validation(val);
      if (message) {
        return invalidMessage || message;
      }
    }
    return undefined;
  };

  return (
    <Field defaultValue={defaultValue} name={name} validate={validate}>
      {({ input, meta }: any) => {
        let invalid = meta.touched && meta.error;
        if (invalidOnPristine) {
          invalid = !!meta.error;
        }
        return (
          <Input
            error={invalid}
            errorMessage={!noErrorMessage && meta.error}
            id={name}
            label={label}
            required={required}
            type={type || 'text'}
            resetActive
            onResetClick={handleReset}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...input}
          />
        );
      }}
    </Field>
  );
};

export default FieldInput;
