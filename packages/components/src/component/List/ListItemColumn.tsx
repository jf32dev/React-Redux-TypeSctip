import React from 'react';
import cx from 'classnames';
import styles from './List.module.scss';

type TListItemColumn = {
  children: React.ReactNode;
  className?: string;
  hAlign?: 'left' | 'center' | 'right';
  vAlign?: 'top' | 'center' | 'bottom';
};
const ListItemColumn = ({
  children,
  hAlign = 'left',
  vAlign = 'center',
  className,
}: TListItemColumn) => {
  return (
    <div
      className={cx(
        styles.itemColumn,
        styles[`h-${hAlign}`],
        styles[`v-${vAlign}`],
        className
      )}
    >
      {children}
    </div>
  );
};

ListItemColumn.displayName = 'ListItemColumn';

export default ListItemColumn;
