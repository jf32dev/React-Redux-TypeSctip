import React from 'react';
import cx from 'classnames';
import styles from './List.module.scss';

type TListChildren = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const ListItem = ({ children, className, onClick }: TListChildren) => {
  return (
    <li className={cx(styles.item, onClick && styles.link, className)}>
      {onClick && <div className={styles.mask} />}
      <div className={styles.content} onClick={onClick}>
        {children}
      </div>
    </li>
  );
};

ListItem.displayName = 'ListItem';

export default ListItem;
