import * as React from 'react';
import cx from 'classnames';
import styles from './Tag.module.scss';

type TProps = {
  name: string;
  type?: string;
  className?: string;
};

const Tag = ({ name, type, className }: TProps) => (
  <div
    className={cx(
      styles.tag,
      className,
      type && styles[type],
      type && styles.categorised
    )}
  >
    <span>{name}</span>
  </div>
);

export default Tag;
