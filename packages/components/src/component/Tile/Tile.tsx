import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Tile.module.scss';

type Props = {
  className?: string;
  disabled?: boolean;
  icon: any;
  linkTo?: string;
  title: string;
  note?: string;
  type: 'button' | 'navigation';
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Tile = ({
  className,
  disabled = false,
  icon,
  linkTo,
  note,
  title,
  type,
  onClick,
  ...props
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
  };
  if (type === 'navigation' && linkTo) {
    return (
      <div
        className={cx(styles.tile, disabled && styles.disabled, className)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <div className={styles.mask} />
        <Link className={styles.container} to={linkTo}>
          <span className={cx(styles.icon, 'icon')}>{icon}</span>
          <span className={styles.title}>{title}</span>
          {note && <span className={styles.note}>{note}</span>}
        </Link>
      </div>
    );
  }
  if (type === 'button' && onClick) {
    return (
      <div
        className={cx(styles.tile, disabled && styles.disabled, className)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <div className={styles.mask} />
        <div className={styles.container} onClick={handleClick}>
          <span className={cx(styles.icon, 'icon')}>{icon}</span>
          <span className={styles.title}>{title}</span>
          {note && disabled && <span className={styles.note}>{note}</span>}
        </div>
      </div>
    );
  }
  return null;
};

export default Tile;
