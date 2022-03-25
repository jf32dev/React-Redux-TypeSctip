import * as React from 'react';
import cx from 'classnames';
import styles from './FeaturedStory.module.scss';

export type FeaturedStoryProps = {
  item: {
    id: number;
    title: string;
    image: string;
    description: string;
  };
  onClick?: (id: number) => void;
};

const FeaturedStory = ({ item, onClick }: FeaturedStoryProps) => {
  const handleOnCardClick = () => {
    onClick && onClick(item.id);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <figure
      className={cx(styles.wrapper, onClick && styles.clickable)}
      data-test="component-featured-story"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(onClick && {
        role: 'button',
        onClick: handleOnCardClick,
      })}
    >
      {onClick && <div className={styles.mask} />}
      <div className={styles.container}>
        <div
          className={styles.image}
          role="img"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <figcaption className={styles.details}>
          <h3 className={styles.title}>{item.title}</h3>
          <span className={styles.description}>{item.description}</span>
        </figcaption>
      </div>
    </figure>
  );
};

export default FeaturedStory;
