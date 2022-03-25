import * as React from 'react';
import { FieldInput } from '../../FormFields';
import { positiveNumber } from '../../../../utils/validator';

import styles from '../ProductForm.module.scss';
import { fieldsMap } from '../utils';

type Props = {
  data: { name: string; label: string }[];
  setValue: (...args: any) => void;
};

const InputFieldComponents = ({ data, setValue }: Props) => (
  <>
    {data.map((input) => (
      <div key={input.name} className={styles.col}>
        <FieldInput
          label={fieldsMap(input.label)}
          name={input.name}
          setValue={setValue}
          type="number"
          validation={positiveNumber}
        />
      </div>
    ))}
  </>
);

export default InputFieldComponents;
