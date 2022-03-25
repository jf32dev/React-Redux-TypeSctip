import * as React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

const ButtonGroup = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <div className={cx(styles.group, className)}>{children}</div>;
};

export default ButtonGroup;
