import * as React from 'react';
import cx from 'classnames';
import { useTabsContext } from './TabsContext';

import styles from './TabLabel.module.scss';

type Props = {
  id: string;
  label: string;
  // key enables correct display and ordering of options for mobile view
  key: number;
  suffix?: React.ReactText;
  className?: string;
};

const TabLabel = ({ id, label, suffix, className }: Props) => {
  const { activeTabId, setActiveTabId } = useTabsContext();

  return (
    <div
      className={cx(
        styles.container,
        activeTabId === id && styles.active,
        'label',
        className
      )}
      id={id}
      onClick={() => setActiveTabId(id)}
    >
      {label}
      {suffix && suffix}
    </div>
  );
};

TabLabel.displayName = 'TabLabel';

export default TabLabel;
