import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { EButtonVariant } from '@redbull/components';

import WingtipsLogo from '@redbull/common/images/wingtip-logo.png';
import buttonStyle from '@redbull/components/src/component/Button/Button.module.scss';

import envConfig from '../../config';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <section className={styles.banner} />
        <section className={styles.welcome}>
          <article>
            <img
              alt="RedBull WingTips"
              className={styles.logo}
              src={WingtipsLogo}
            />
            <h1>WINGSTIPS REGISTRATION</h1>
            <p>
              Welcome to WingTips! A communication resource for Red Bull
              Distributor Partners.
            </p>
            <div className={styles.buttons}>
              <a
                className={cx(
                  buttonStyle.button,
                  buttonStyle[EButtonVariant.PRIMARY],
                  styles.button
                )}
                href={envConfig.hubLogin}
                role="button"
              >
                Existing User
              </a>
              <Link
                className={cx(
                  buttonStyle.button,
                  buttonStyle[EButtonVariant.PRIMARY],
                  styles.button
                )}
                role="button"
                to="/register"
              >
                Register
              </Link>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Login;
