import React from 'react';
import cx from 'classnames';

import { Loader } from '@redbull/components';
import { UCSearchResult } from '@redbull/services';

import { useHistory } from 'react-router';
import StoryItem from './StoryItem';
import NoResult from './NoResult';

import styles from './Story.module.scss';

type TProps = {
  title: string;
  zunosItems: UCSearchResult[];
  loading?: boolean;
  className?: string;
  nowrap?: boolean;
  extraButton?: JSX.Element;
};

const ZunosBlock = ({
  title,
  zunosItems,
  loading,
  className,
  nowrap,
  extraButton,
}: TProps) => {
  const history = useHistory();

  if (loading) {
    return <Loader />;
  }

  const handleClickZunosObject = (item: UCSearchResult) => () =>
    history.push(`/earn/${item.urn}`);

  return (
    <div className={cx(styles.block, className)}>
      <div className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        {extraButton}
      </div>
      {zunosItems.length > 0 ? (
        <div className={cx(styles.list, nowrap && styles['horizontal-scroll'])}>
          {zunosItems.map((item) => (
            <StoryItem
              key={item.id}
              excerpt={item.description}
              thumbnail={item.thumbnailUrl || ''}
              title={item.name}
              onClick={handleClickZunosObject(item)}
            />
          ))}
        </div>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

export default ZunosBlock;
