import React from 'react';
import cn from 'classnames';
import { ELoaderSize, ELoaderBackground } from './enum';

import styles from './Loader.module.scss';

type TLoader = {
  textColour?: string;
  background?: ELoaderBackground;
  className?: string;
  size?: ELoaderSize;
  text?: string;
};

const Loader = ({
  textColour,
  background = ELoaderBackground.WHITE,
  className,
  size = ELoaderSize.MEDIUM,
  text,
}: TLoader) => (
  <div
    className={cn(styles.loader, styles[size], styles[background], className)}
  >
    <div className={styles.spinner} />
    {text && (
      <div
        className={cn(styles.text, text.length <= 12 && styles.center)}
        style={{ color: textColour || 'inherit' }}
      >
        {text}
      </div>
    )}
  </div>
);

export default Loader;
