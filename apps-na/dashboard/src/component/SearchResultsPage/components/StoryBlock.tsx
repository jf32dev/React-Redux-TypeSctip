import React from 'react';
import cx from 'classnames';

import { Loader } from '@redbull/components';
import { SearchStory } from '@redbull/services';

import { useTranslation } from 'react-i18next';
import StoryItem from './StoryItem';
import NoResult from './NoResult';

import styles from './Story.module.scss';
import useOpenStory from '../../../hooks/useOpenStory';

type TProps = {
  stories: SearchStory[];
  loading?: boolean;
  className?: string;
  nowrap?: boolean;
  extraButton?: JSX.Element;
};

const StoryBlock = ({
  stories,
  loading,
  className,
  nowrap,
  extraButton,
}: TProps) => {
  const { t } = useTranslation();

  const [openStory] = useOpenStory();

  if (loading) {
    return <Loader />;
  }

  const handleStoryClick = (id: number) => () => openStory(id, true);

  return (
    <div className={cx(styles.block, className)}>
      <div className={styles.head}>
        <h3 className={styles.title}>{t('utils.stories')}</h3>
        {extraButton}
      </div>
      {stories.length > 0 ? (
        <div className={cx(styles.list, nowrap && styles['horizontal-scroll'])}>
          {stories.map((story) => (
            <StoryItem
              key={story.id}
              excerpt={story.excerpt}
              thumbnail={story.thumbnail}
              title={story.title}
              onClick={handleStoryClick(story.id)}
            />
          ))}
        </div>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

export default StoryBlock;
