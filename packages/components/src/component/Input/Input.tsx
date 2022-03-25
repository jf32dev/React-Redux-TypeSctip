import * as React from 'react';
import { uniqueId } from 'lodash';
import cx from 'classnames';

import { ReactComponent as CrossIcon } from '@redbull/common/icons/cross.svg';
import { Button, EButtonVariant } from '../Button';

import styles from './Input.module.scss';

type TInputProps = {
  containerClassName?: string;
  error?: boolean;
  icon?: any;
  label?: string;
  errorMessage?: string;
  resetActive?: boolean;
  reverse?: boolean;
  useIcon?: boolean;
  onIconClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => void;
  onResetClick?: (inputElement: HTMLInputElement | null) => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const Input = ({
  containerClassName,
  disabled,
  error,
  icon,
  label,
  errorMessage,
  readOnly,
  required,
  resetActive,
  reverse,
  useIcon,
  onIconClick,
  onResetClick,
  value,
  ...props
}: TInputProps) => {
  const input = React.useRef<HTMLInputElement | null>(null);

  const [focused, setFocused] = React.useState(false);
  const [id] = React.useState(uniqueId('input_'));

  const handleIconClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onIconClick && input.current) {
      onIconClick(event, input.current.value);
    }
  };

  const handleResetClick = () => {
    if (onResetClick) {
      onResetClick(input.current);
    }
  };

  return (
    <div className={cx(styles.input, containerClassName)}>
      {label && (
        <label className={cx(required && styles.required)} htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={cx(
          styles.custominput,
          (disabled || readOnly) && styles.disabled,
          error && styles.error,
          focused && styles.focused
        )}
        id={id}
      >
        {reverse && useIcon && icon && (
          <Button
            className={styles.btnicon}
            variant={EButtonVariant.SECONDARY_WHITE}
            onClick={handleIconClick}
          >
            {icon}
          </Button>
        )}
        <input
          ref={input}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          value={value}
          onBlur={() => {
            setFocused(false);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
        {resetActive && (!!value || value === 0) && (
          <Button
            aria-label="reset"
            className={styles.btnreset}
            variant={EButtonVariant.SECONDARY_WHITE}
            onClick={handleResetClick}
          >
            <CrossIcon />
          </Button>
        )}
        {!reverse && useIcon && icon && (
          <Button
            className={styles.btnicon}
            variant={EButtonVariant.SECONDARY_WHITE}
            onClick={handleIconClick}
          >
            {icon}
          </Button>
        )}
      </div>
      {error && errorMessage && (
        <div className={styles.message}>{errorMessage}</div>
      )}
    </div>
  );
};

export default Input;
