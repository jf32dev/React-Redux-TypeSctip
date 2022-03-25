import * as React from 'react';
import cx from 'classnames';
import { useTabsContext } from './TabsContext';

import styles from './TabContent.module.scss';

type Props = {
  id: string;
  children: React.ReactNodeArray | React.ReactNode;
  className?: string;
};

const TabContent = ({ id, children, className }: Props) => {
  const { activeTabId } = useTabsContext();

  return id === activeTabId ? (
    <div className={cx(styles.container, className)}>{children}</div>
  ) : null;
};

TabContent.displayName = 'TabContent';

export default TabContent;
