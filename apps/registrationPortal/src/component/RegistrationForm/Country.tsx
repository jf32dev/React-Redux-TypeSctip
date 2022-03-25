import * as React from 'react';
import { ValueType } from 'react-select';
import { ISelectOption } from '../../hooks/type';
import { FieldSelect } from './components';

type Props = {
  options: ISelectOption[];
  setValue: (...args: any) => void;
};

const Country = ({ options, setValue }: Props) => {
  const handleChange = (
    value: ValueType<{
      label: string;
      value: string;
    }>
  ) => {
    setValue('country', value);
    setValue('region', null);
  };

  return (
    <FieldSelect
      errorMessage="Please select your Country of Work"
      label="Country of Work"
      name="country"
      options={options}
      searchable={options.length > 5}
      required
      onChange={handleChange}
    />
  );
};

export default Country;
