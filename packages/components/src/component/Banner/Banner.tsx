import React, { PropsWithChildren } from 'react';
import cx from 'classnames';

import { EBannerAlign } from './enum';

import styles from './Banner.module.scss';

type TBannerProps = {
  align?: EBannerAlign;
  className?: string;
  image?: string;
  justify?: 'between' | 'around' | 'evenly';
};

const Banner = ({
  align = EBannerAlign.BOTTOM,
  justify,
  children,
  className,
  image,
}: PropsWithChildren<TBannerProps>) => {
  return (
    <div
      className={cx(styles.banner, !image && styles.noBackground, className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(image && {
        style: {
          backgroundImage: `url(${image})`,
        },
      })}
    >
      {image && <div className={styles.overlay} />}
      <div
        className={cx(
          styles.content,
          styles[align],
          justify && styles[justify]
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Banner;
