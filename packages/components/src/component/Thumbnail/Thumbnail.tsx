import * as React from 'react';
import defaultImage from '@redbull/common/images/wingtip-logo.png';
import styles from './Thumbnail.module.scss';

type Props = {
  url: string;
  name?: string;
};

const Thumbnail = ({ url, name }: Props) => (
  <div className={styles.container}>
    <img
      alt={name || 'Thumbnail'}
      src={url}
      onError={(e) => {
        e.currentTarget.src = defaultImage;
        e.currentTarget.style.maxWidth = '9rem';
      }}
    />
  </div>
);

export default Thumbnail;
