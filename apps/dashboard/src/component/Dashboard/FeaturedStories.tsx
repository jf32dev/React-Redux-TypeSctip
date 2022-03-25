import * as React from 'react';
import cx from 'classnames';

import { Loader } from '@redbull/components';
import { useTranslation } from 'react-i18next';
import FeaturedStory from './components/FeaturedStory';
import useFeaturedStories from '../../hooks/useFeaturedStories';
import useOpenStory from '../../hooks/useOpenStory';

import styles from './FeaturedStories.module.scss';

type Props = {
  className?: string;
};

const FeaturedStories = ({ className }: Props) => {
  const { t } = useTranslation();
  const [featured, loading] = useFeaturedStories(true);
  const [openStory] = useOpenStory();

  const handleFeaturedCardClick = (id: number) => {
    openStory(id);
  };

  if (!loading && featured.length === 0) {
    return (
      <div
        className={cx(styles['horizontal-scroll'], className)}
        data-test="no-data-message"
      >
        <div className={styles.noStory}>
          {t('errorMessages.noFeaturedStories')}
        </div>
      </div>
    );
  }

  return (
    <div className={cx(styles['horizontal-scroll'], className)}>
      {loading && featured.length === 0 ? (
        <Loader data-test="loader" />
      ) : (
        featured.map((story) => (
          <FeaturedStory
            key={story.id}
            data-test="featured-story"
            item={{
              id: story.id,
              title: story.title,
              image: story.featuredImage || '',
              description: story.message || story.excerpt,
            }}
            onClick={handleFeaturedCardClick}
          />
        ))
      )}
    </div>
  );
};

export default FeaturedStories;
