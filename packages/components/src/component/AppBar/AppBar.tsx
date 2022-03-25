import * as React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Logo from '@redbull/common/images/wingtip-logo.png';
import styles from './AppBar.module.scss';

type Props = {
  burger?: any;
  primaryMenu?: any;
  secondaryMenu?: any;
  hideLogo?: boolean;
};

const AppBar = ({
  burger,
  primaryMenu,
  secondaryMenu,
  hideLogo = false,
}: Props) => (
  <div className={styles.container}>
    <div className={styles.left}>
      {burger}
      {!hideLogo && (
        <Link className={cx(styles.logo, 'sm-hide-flex')} to="/">
          <img alt="RedBull WingTips" src={Logo} />
        </Link>
      )}
      {primaryMenu}
    </div>
    {!hideLogo && (
      <Link className={cx(styles.logo, 'md-hide-flex')} to="/">
        <img alt="RedBull WingTips" src={Logo} />
      </Link>
    )}
    <div className={styles.right}>{secondaryMenu}</div>
  </div>
);

export default AppBar;
