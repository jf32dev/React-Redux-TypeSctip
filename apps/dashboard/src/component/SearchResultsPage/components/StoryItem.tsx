import React from 'react';
import { decode } from '@redbull/common';
import { SearchStory } from '@redbull/services';

import useOpenStory from '../../../hooks/useOpenStory';

import defaultImg from '../../../images/redbull-default.png';
import styles from './Story.module.scss';

type TProps = Pick<SearchStory, 'id' | 'thumbnail' | 'title' | 'excerpt'>;

const StoryItem = ({ id, thumbnail, title, excerpt }: TProps) => {
  const [openStory] = useOpenStory();

  const onImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.src = defaultImg;
  };

  const handleOpenStory = () => {
    openStory(id);
  };

  const storyTitle = decode(title);

  return (
    <div className={styles.container} onClick={handleOpenStory}>
      <div className={styles.story}>
        <div className={styles.overlay} />
        <img
          alt={storyTitle}
          src={thumbnail || defaultImg}
          onError={onImgError}
        />
        <div className={styles.info}>
          <h4 className={styles.title}>{storyTitle}</h4>
          <p className={styles.description}>{excerpt}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryItem;
