import { ELoaderSize, Loader, NoDataError } from '@redbull/components';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileLoadingScreen.module.scss';
import { invalidate } from '../../api/services/auth/utils';

type Props = {
  status: 'idle' | 'loading' | 'failed';
};

const ProfileLoadingScreen = ({ status }: Props) => {
  return (
    <div className={styles.full}>
      {/* NOTE: the text is can be changed to anything */}
      {status === 'loading' || status === 'idle' ? (
        <Loader size={ELoaderSize.LARGE} text="Loading your experience" />
      ) : (
        <NoDataError title="Failed to load your profile">
          Please Contact Administrator
          <br />
          <br />
          <Link to="/" onClick={invalidate}>
            back to login page
          </Link>
        </NoDataError>
      )}
    </div>
  );
};

export default ProfileLoadingScreen;
