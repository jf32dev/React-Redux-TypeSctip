import React from 'react';
import cx from 'classnames';

import { Loader } from '@redbull/components';
import { SearchStory } from '@redbull/services';

import { useTranslation } from 'react-i18next';
import StoryItem from './StoryItem';
import NoResult from './NoResult';

import styles from './Story.module.scss';

type TProps = {
  stories: SearchStory[];
  loading?: boolean;
  className?: string;
  nowrap?: boolean;
};

const StoryBlock = ({ stories, loading, className, nowrap }: TProps) => {
  const { t } = useTranslation();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={cx(styles.block, className)}>
      <h3 className={styles.title}>{t('utils.stories')}</h3>
      {stories.length > 0 ? (
        <div className={cx(styles.list, nowrap && styles['horizontal-scroll'])}>
          {stories.map((story) => (
            <StoryItem
              key={story.id}
              excerpt={story.excerpt}
              id={story.id}
              thumbnail={story.thumbnail}
              title={story.title}
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
