import * as React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './PrimaryMenu.module.scss';

type Props = {
  label: string;
  to: string;
};

const PrimaryMenuItem = ({ label, to }: Props) => (
  <li>
    <NavLink activeClassName={styles.active} to={to}>
      {label}
    </NavLink>
  </li>
);

PrimaryMenuItem.displayName = 'PrimaryMenuItem';

export default PrimaryMenuItem;
