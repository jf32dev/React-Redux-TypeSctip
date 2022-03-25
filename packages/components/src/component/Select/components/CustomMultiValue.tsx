import React from 'react';
import { MultiValueProps } from 'react-select';
import { ReactComponent as Cross } from '@redbull/common/icons/cross.svg';
import styles from './CustomMultiValue.module.scss';

const CustomMultiValue = (props: MultiValueProps<any>) => {
  const {
    getValue,
    // @ts-ignore
    index,
    clearValue,
  } = props;
  if (index > 0) {
    return null;
  }
  return (
    <div className={styles.container} onClick={clearValue}>
      <span>{getValue().length}</span>
      <Cross />
    </div>
  );
};

export default CustomMultiValue;
