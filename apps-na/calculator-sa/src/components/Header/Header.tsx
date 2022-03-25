import * as React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <label className={styles.headerBreadcrumbs}>
        Home {'>'} Shelf Allocation Tool
      </label>
      <div className={styles.headerTitle}>
        <div className={styles.title}>SHELF ALLOCATION TOOL</div>
        <p className={styles.ofpTitle}>Off Premise</p>
      </div>
    </div>
  );
};

export default Header;
