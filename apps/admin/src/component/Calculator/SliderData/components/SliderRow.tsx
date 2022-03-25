import * as React from 'react';
import { FieldInput, FieldSelect, PrefixedField } from '../../FormFields';
import { unitOptions } from '../config';
import styles from '../SliderData.module.scss';

type Props = {
  sliderName: string;
  setValue: (...args: any) => void;
};

const SliderRow = ({ sliderName, setValue }: Props) => {
  return (
    <div className={styles.row}>
      <div className={styles.column}>{sliderName}</div>
      <div className={styles.column}>
        <PrefixedField name="min">
          {({ name }: { name: string }) => {
            return (
              <FieldInput
                name={name}
                setValue={setValue}
                type="number"
                invalidOnPristine
              />
            );
          }}
        </PrefixedField>
      </div>
      <div className={styles.column}>
        <PrefixedField name="max">
          {({ name }: { name: string }) => (
            <FieldInput
              name={name}
              setValue={setValue}
              type="number"
              invalidOnPristine
            />
          )}
        </PrefixedField>
      </div>
      <div className={styles.column}>
        <PrefixedField name="defaultValue">
          {({ name }: { name: string }) => {
            return (
              <FieldInput
                name={name}
                setValue={setValue}
                type="number"
                invalidOnPristine
              />
            );
          }}
        </PrefixedField>
      </div>
      <div className={styles.column}>
        <PrefixedField name="unit">
          {({ name }: { name: string }) => (
            <FieldSelect
              name={name}
              options={unitOptions}
              setValue={setValue}
              invalidOnPristine
            />
          )}
        </PrefixedField>
      </div>
    </div>
  );
};

export default SliderRow;
