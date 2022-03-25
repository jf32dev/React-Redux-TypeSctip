import * as React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './MenuItem.module.scss';

type Props = {
  label: string;
  linkTo: string;
};

const MenuItem = ({ label, linkTo }: Props) => (
  <li className={cx(styles.container)}>
    <NavLink
      activeClassName="active"
      className={cx(styles.label, 'label')}
      to={linkTo}
    >
      {label}
    </NavLink>
  </li>
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
