import React from 'react';
import cx from 'classnames';
import ThumbnailDocument from '../ThumbnailDocument';
import { Loader } from '../Loader';
import styles from './DocumentList.module.scss';
import { NoDataError } from '..';

type TDocumentList = {
  alwaysFirstLoad?: boolean;
  className?: string;
  items: any[];
  loading?: boolean;
  loadingText: string;
  noDataDescription: string;
  noDataText: string;
  wrap?: boolean;
  onDocumentClick?: (id: number, type: string) => void;
};
const DocumentList = ({
  alwaysFirstLoad,
  className,
  items,
  loading = false,
  loadingText,
  noDataDescription,
  noDataText,
  wrap = false,
  onDocumentClick,
}: TDocumentList) => {
  const isFirstLoad = items.length === 0 && loading;

  const handleClick = (id: number, type: string) => {
    if (onDocumentClick) {
      onDocumentClick(id, type);
    }
  };

  // if there is no data and it is loading then display loader.
  if (loading && (isFirstLoad || alwaysFirstLoad)) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <NoDataError
        className={styles['no-content']}
        title={noDataText || 'No Content'}
      >
        {noDataDescription ||
          'Unfortunately, we could not get the content for you. Please contact the administrator to get further help.'}
      </NoDataError>
    );
  }

  return (
    <div className={cx(styles.documents, wrap && styles.wrap, className)}>
      {items.map((item) => {
        return item.type === 'story' ? (
          <ThumbnailDocument
            key={item.id}
            item={{
              id: item.id,
              type: item.type,
              category: item.type,
              description: item.title,
              image: item.thumbnail,
            }}
            onClick={handleClick}
          />
        ) : (
          <ThumbnailDocument
            key={item.id}
            item={{
              id: item.id,
              type: item.category,
              category: item.type,
              description: item.description,
              image: item.thumbnail,
            }}
            onClick={handleClick}
          />
        );
      })}
      {loading && !isFirstLoad && (
        <Loader text={loadingText || 'Loading more...'} />
      )}
    </div>
  );
};

export default DocumentList;
