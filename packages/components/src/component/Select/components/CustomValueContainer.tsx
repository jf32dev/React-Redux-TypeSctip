import React from 'react';
import { ValueContainerProps, components } from 'react-select';

import styles from './CustomValueContainer.module.scss';

const CustomValueContainer = (props: ValueContainerProps<any>) => {
  const {
    children,
    getValue,
    selectProps: { inputValue, placeholder, isMulti },
  } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.ValueContainer {...props}>
      {children}
      {isMulti && getValue().length > 0 && inputValue?.length === 0 && (
        <span className={styles.hiddenPlaceholder}>{placeholder}</span>
      )}
    </components.ValueContainer>
  );
};

export default CustomValueContainer;
