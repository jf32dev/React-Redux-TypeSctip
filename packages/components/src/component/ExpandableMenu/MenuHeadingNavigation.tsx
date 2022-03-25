import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './MenuHeading.module.scss';

type Props = {
  label: string;
  to: string;
};

const MenuHeadingNavigation = ({ label, to }: Props) => {
  return (
    <li className={styles.container}>
      <Link className={styles.link} to={to}>
        <span className={cx(styles.label, 'label')}>{label}</span>
      </Link>
    </li>
  );
};

MenuHeadingNavigation.displayName = 'MenuHeadingNavigation';

export default MenuHeadingNavigation;
