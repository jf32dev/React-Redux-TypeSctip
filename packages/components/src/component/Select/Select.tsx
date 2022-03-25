import React from 'react';
import Select, { Props } from 'react-select';
import cx from 'classnames';
import { uniqueId } from 'lodash';

import ClearButton from './components/ClearButton';
import DropdownChevron from './components/DropdownChevron';
import CustomMenuList from './components/CustomMenuList';
import CustomMultiValue from './components/CustomMultiValue';
import CustomOption from './components/CustomOption';
import CustomValueContainer from './components/CustomValueContainer';

import styles from './Select.module.scss';
import './Select.scss';

type TCustomSelectProps = {
  className?: string;
  invalid?: boolean;
  label?: string;
  errorMessage?: string;
  required?: boolean;
} & Props<{ label: string; value: string }>;

const CustomSelect = ({
  className,
  invalid,
  label,
  errorMessage,
  required,
  ...props
}: TCustomSelectProps) => {
  const [id] = React.useState(uniqueId('select_'));
  return (
    <div className={cx(styles.select, className)}>
      {label && (
        <label
          className={cx(styles.label, required && styles.required)}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <Select
        className={cx('select-container', invalid && 'invalid')}
        classNamePrefix="rb-select"
        components={{
          ClearIndicator: ClearButton,
          DropdownIndicator: DropdownChevron,
          IndicatorSeparator: null,
          MenuList: CustomMenuList,
          MultiValue: CustomMultiValue,
          Option: CustomOption,
          ValueContainer: CustomValueContainer,
        }}
        id={id}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        // forcing this so that selected options is not gone
        hideSelectedOptions={false}
      />
      {invalid && errorMessage && (
        <div className={styles.message}>{errorMessage}</div>
      )}
    </div>
  );
};

export default CustomSelect;
