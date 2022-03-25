import React from 'react';
import cx from 'classnames';

import ListItem from './ListItem';
import ListItemColumn from './ListItemColumn';

import styles from './List.module.scss';

type TList = {
  children?: React.ReactNode;
  className?: string;
};

const List = ({ children, className }: TList) => {
  return (
    <ul className={cx(styles.list, className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const { displayName } = (child as React.ReactElement).type as any;
          if (displayName === 'ListItem') {
            return child;
          }
        }
        return null;
      })}
    </ul>
  );
};

List.Item = ListItem;
List.ItemColumn = ListItemColumn;
export default List;
