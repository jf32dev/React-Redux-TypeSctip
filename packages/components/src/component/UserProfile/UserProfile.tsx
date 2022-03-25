import React from 'react';
import cx from 'classnames';
import { getRandomNumber } from '@redbull/common';
import '@redbull/common/style/bullFitness.scss';

import { EUserProfileColor, EUserProfileSize } from './enum';
import { fallbackIcon } from './config';

import styles from './UserProfile.module.scss';

type TUserProfile = {
  border?: boolean;
  color?: EUserProfileColor;
  imageSrc?: string;
  name?: string;
  position?: string;
  roleIcon?: string;
  roleDescription?: string;
  size?: EUserProfileSize;
  statusIcon?: string;
  statusDescription?: string;
};

const UserProfile = ({
  border = false,
  color = EUserProfileColor.GREY,
  imageSrc,
  name,
  position,
  roleIcon,
  roleDescription,
  size = EUserProfileSize.LARGE,
  statusIcon,
  statusDescription,
}: TUserProfile) => {
  const [fallback, setFallback] = React.useState(false);
  const [random] = React.useState(getRandomNumber(0, fallbackIcon.length - 1));
  const imgFallback = () => fallbackIcon[random];

  const onImageError = () => setFallback(true);

  return (
    <div
      className={cx(
        styles.profile,
        styles[color],
        styles[size],
        border && styles.border
      )}
    >
      <div className={styles.image}>
        {imageSrc && !fallback ? (
          <img
            alt="profile"
            className={styles.picture}
            src={imageSrc}
            onError={onImageError}
          />
        ) : (
          <div className={styles.picture}>
            <span className={cx(styles.fallback, `${imgFallback()}`)} />
          </div>
        )}
        {statusIcon && (
          <span className={cx(styles.status)} title={statusDescription}>
            <i className={cx(`${statusIcon}`)} />
          </span>
        )}
      </div>
      {(name || position || roleIcon) && (
        <div className={styles.data}>
          <strong className={styles.name}>{name}</strong>
          <div className={styles.position}>
            <span className={styles.title}>{position}</span>
            {roleIcon && (
              <span className={cx(styles.icon)} title={roleDescription}>
                <i className={cx(`${roleIcon}`)} />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
