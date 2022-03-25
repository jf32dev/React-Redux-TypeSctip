import React from 'react';
import { components, OptionProps } from 'react-select';
import Checkbox from '../../Checkbox';

const CustomOption = (props: OptionProps<any>) => {
  const {
    selectProps: { isMulti },
    isSelected,
    label,
  } = props;
  if (isMulti) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <components.Option {...props}>
        <Checkbox checked={isSelected} label={label} onChange={() => null} />
      </components.Option>
    );
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <components.Option {...props} />;
};

export default CustomOption;
