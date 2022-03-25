import * as React from 'react';

import {
  Button,
  EButtonVariant,
  ELoaderSize,
  Loader,
} from '@redbull/components';
import WingtipsLogo from '@redbull/common/images/wingtip-logo.png';

import { useTypedSelector } from 'src/store';
import { createState } from '../../api/services/auth/utils';
import envConfig from '../../config';
import styles from './Login.module.scss';

const Login = () => {
  const authStatus = useTypedSelector((state) => state.auth.status);

  const handleLogin = async () => {
    const state = await createState();
    const url = `${envConfig.apiBase}/api/v1/auth/login?state=${state}`;

    window.location.href = url;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.banner} />
        <section className={styles.welcome}>
          <article>
            <img alt="Redbull Wingtips" src={WingtipsLogo} />
            <h1>Admin Portal</h1>
            <p>
              Welcome to WingTips! A communication resource for Red Bull
              Distributor Partners.
            </p>
            {authStatus === 'loading' ? (
              <Loader size={ELoaderSize.SMALL} />
            ) : (
              <Button
                className={styles.login}
                variant={EButtonVariant.PRIMARY}
                onClick={handleLogin}
              >
                Log in
              </Button>
            )}
          </article>
        </section>
      </div>
    </div>
  );
};

export default Login;
