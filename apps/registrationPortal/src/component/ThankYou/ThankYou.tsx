import * as React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { EButtonVariant } from '@redbull/components';
import buttonStyle from '@redbull/components/src/component/Button/Button.module.scss';
import ThankYou from '../../images/thank-you.png';

import styles from './ThankYou.module.scss';

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <section className={styles.banner}>
          <img alt="RedBull WingTips" className={styles.img} src={ThankYou} />
        </section>
        <section className={styles.thanks}>
          <article>
            <h1>THANK YOU!</h1>
            <p>
              Thank you for registering with Red Bull WingTips site. A request
              for your account has been sent to your DP admin. You will be
              confirmed soon via email.
            </p>
            <Link
              className={cx(
                buttonStyle.button,
                buttonStyle[EButtonVariant.PRIMARY],
                styles.button
              )}
              role="button"
              to="/"
            >
              Go Back
            </Link>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Login;
