import * as React from 'react';
import { ColourPalette, isColourValid } from '@redbull/components';
import { Field } from 'react-final-form';

type Props = {
  label: string;
  name: string;
};

const FieldImage = ({ label, name }: Props) => {
  const validate = (val: string) => {
    if (!val) {
      return 'This field is required';
    }
    if (!isColourValid(val)) {
      return 'Please enter a valid colour.';
    }
    return undefined;
  };

  return (
    <Field defaultValue="WHITE" name={name} validate={validate}>
      {({ input, meta }: any) => {
        return (
          <ColourPalette
            error={meta.error}
            label={label}
            value={input.value}
            onChange={input.onChange}
          />
        );
      }}
    </Field>
  );
};

export default FieldImage;
