import * as React from 'react';
import { FieldSelect } from '../../FormFields';
import { IFieldSelect } from '../../../../api/services/fields/type';
import styles from '../ProductForm.module.scss';
import { fieldsMap } from '../utils';

type Props = {
  data: IFieldSelect[];
  setValue: (...args: any) => void;
};

const SelectComponents = ({ data, setValue }: Props) => {
  return (
    <>
      {data.map((select) => {
        const { id, name, label, options } = select;
        return (
          <div key={id} className={styles.col}>
            <FieldSelect
              isClearable={false}
              label={fieldsMap(label)}
              name={name}
              options={options}
              setValue={setValue}
            />
          </div>
        );
      })}
    </>
  );
};

export default SelectComponents;
