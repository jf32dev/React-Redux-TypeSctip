import * as React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './DropdownItem.module.scss';

type Props = {
  className?: string;
  disabled?: boolean;
  link: string;
  onClick?: () => void;
};

const DropdownItem = ({
  children,
  className,
  disabled,
  link,
  onClick,
}: React.PropsWithChildren<Props>) => {
  const handleOnClick = () => onClick && onClick();

  return (
    <li className={cx(styles.item, disabled && styles.disabled, className)}>
      <Link to={link} onClick={handleOnClick}>
        {children}
      </Link>
    </li>
  );
};

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
