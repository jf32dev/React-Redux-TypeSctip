import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import { EButtonVariant, EButtonSize } from './enum';
import ButtonGroup from './ButtonGroup';

type TButtonProps = {
  active?: boolean;
  className?: string;
  disabled?: boolean;
  href?: string;
  size?: string;
  name?: string;
  reverse?: boolean;
  iconOnly?: boolean;
  variant?: EButtonVariant;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const Button = ({
  active = false,
  className,
  children,
  disabled,
  size = EButtonSize.NORMAL,
  type = 'button',
  reverse,
  iconOnly,
  variant,
  ...props
}: React.PropsWithChildren<TButtonProps>) => {
  /* eslint-disable react/button-has-type */
  return (
    <button
      className={cx(
        className,
        styles.button,
        active && styles.active,
        disabled && styles.disabled,
        iconOnly && styles['icon-only'],
        reverse && styles.reverse,
        size && styles[size],
        variant && styles[variant]
      )}
      disabled={disabled}
      type={type}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
Button.Group = ButtonGroup;
export default Button;
