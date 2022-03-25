import * as React from 'react';
import cx from 'classnames';
import defaultImage from '@redbull/common/images/wingtip-logo.png';
import { decode } from '@redbull/common';
import styles from './ThumbnailDocument.module.scss';

export type TThumbnailDocument = {
  id: number;
  category: string;
  type: string;
  description: string;
  image: string;
};
type Props = {
  item: TThumbnailDocument;
  onClick?: (id: number, type: string) => void;
};

const ThumbnailDocument = ({ item, onClick }: Props) => {
  const handleClick = (id: number, category: string) => {
    if (onClick) {
      onClick(id, category);
    }
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <figure
      className={cx(styles.container, onClick && styles.clickable)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(onClick && {
        role: 'button',
        onClick: () => handleClick(item.id, item.category),
      })}
    >
      <div className={styles.thumbnail}>
        {onClick && <div className={styles.mask} />}
        <div className={cx(styles.tag, styles[item.type.toLowerCase()])}>
          {item.type.toUpperCase()}
        </div>
        <img
          alt={decode(item.description, true)}
          className={styles.picture}
          src={item.image || defaultImage}
          onError={(e) => {
            e.currentTarget.src = defaultImage;
            e.currentTarget.style.objectFit = 'contain';
          }}
        />
      </div>
      <figcaption className={styles.description}>
        {decode(item.description, true)}
      </figcaption>
    </figure>
  );
};

export default ThumbnailDocument;
