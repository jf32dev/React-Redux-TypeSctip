import * as React from 'react';
import { Field } from 'react-final-form';
import { Checkbox } from '@redbull/components';

type Props = {
  label: React.ReactElement;
  name: string;
  errorMessage?: string;
};

const FieldCheckbox = ({ label, name, errorMessage }: Props) => {
  const validate = (value: string) => {
    if (!value) {
      return errorMessage || 'This field is required';
    }
    return undefined;
  };

  return (
    <Field name={name} type="checkbox" validate={validate}>
      {({ input, meta }: any) => (
        <Checkbox
          error={meta.touched && meta.error}
          errorMessage={meta.error}
          id={name}
          label={label}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...input}
        />
      )}
    </Field>
  );
};

export default FieldCheckbox;
