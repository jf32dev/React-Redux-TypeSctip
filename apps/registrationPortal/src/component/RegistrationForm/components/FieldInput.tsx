import * as React from 'react';
import { Field } from 'react-final-form';
import { Input } from '@redbull/components';

type Props = {
  label: string;
  name: string;
  errorMessage?: string;
  setValue: (name: string, value: string) => void;
  validation?: any;
  invalidMessage?: string;
  type?: string;
};

const FieldInput = ({
  label,
  name,
  errorMessage,
  setValue,
  validation,
  invalidMessage,
  type,
}: Props) => {
  const handleReset = () => {
    setValue(name, '');
  };
  const validate = (value: string) => {
    if (validation) {
      if (!validation(value)) {
        return invalidMessage;
      }
      return undefined;
    }
    if (!value) {
      return errorMessage || 'This field is required';
    }
    return undefined;
  };

  return (
    <Field name={name} validate={validate}>
      {({ input, meta }: any) => (
        <Input
          error={meta.touched && meta.error}
          errorMessage={meta.error}
          id={name}
          label={label}
          type={type || 'text'}
          required
          resetActive
          onResetClick={handleReset}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...input}
        />
      )}
    </Field>
  );
};

export default FieldInput;
