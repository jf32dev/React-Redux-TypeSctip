import * as React from 'react';
import cx from 'classnames';
import { uniqueId } from 'lodash';

import { ReactComponent as Tick } from '@redbull/common/icons/tick.svg';

import styles from './Checkbox.module.scss';

type Props = {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  checked,
  className,
  disabled = false,
  id,
  label,
  onChange,
}: Props) => {
  const [autoId] = React.useState(uniqueId('checkbox_'));

  return (
    <div className={cx(styles.container, className)}>
      <input
        checked={checked}
        disabled={disabled}
        id={id || autoId}
        type="checkbox"
        onChange={onChange}
      />
      <span
        className={cx(
          styles.checkbox,
          checked && styles.checked,
          disabled && styles.disabled
        )}
      >
        {checked && <Tick className={styles.icon} />}
      </span>
      {label && <label htmlFor={id || autoId}>{label}</label>}
    </div>
  );
};

export default Checkbox;
