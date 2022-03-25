import React from 'react';
import cx from 'classnames';
import { IndicatorProps, components } from 'react-select';
import { ReactComponent as Chevron } from '@redbull/common/icons/chevron.svg';
import styles from './DropdownChevron.module.scss';

const DropdownChevron = (props: IndicatorProps<any>) => {
  const {
    selectProps: { menuIsOpen },
  } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.DropdownIndicator {...props} className={styles.indicator}>
      <Chevron className={cx(styles.chevron, menuIsOpen && styles.open)} />
    </components.DropdownIndicator>
  );
};

export default DropdownChevron;
