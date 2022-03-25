import * as React from 'react';
import cx from 'classnames';

import styles from './SideMenu.module.scss';

type Props = {
  children: React.ReactNodeArray | React.ReactNode;
  /**
   * slide in / out functionality for mobile
   * menu on desktop is always open
   */
  isOpen: boolean;
};

const SideMenu = React.forwardRef(
  ({ children, isOpen }: Props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className={cx(styles.container, isOpen && styles.open)}>
      <div className={styles.menu}>{children}</div>
    </div>
  )
);

SideMenu.displayName = 'SideMenu';

export default SideMenu;
