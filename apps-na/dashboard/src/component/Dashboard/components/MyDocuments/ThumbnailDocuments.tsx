import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { EButtonVariant, EButtonSize, DocumentList } from '@redbull/components';
import { Story, File } from '@redbull/services';

import buttonStyle from '@redbull/components/src/component/Button/Button.module.scss';
import { useTranslation } from 'react-i18next';
import styles from './ThumbnailDocuments.module.scss';

export type TThumbnailDocumentsProps = {
  alwaysFirstLoad?: boolean;
  items: (Story | File)[];
  loading?: boolean;
  noDataText?: string;
  onItemClick: (id: number, type: string) => void;
  id: string;
};
const ThumbnailDocuments = ({
  items,
  loading,
  noDataText,
  onItemClick,
  id,
  alwaysFirstLoad,
}: TThumbnailDocumentsProps) => {
  const { t } = useTranslation();

  return items.length > 0 || loading ? (
    <div className={styles.container} data-test="thumbnail-documents">
      <DocumentList
        alwaysFirstLoad={alwaysFirstLoad}
        className={styles['document-list']}
        items={items.slice(0, 10)}
        loading={loading}
        loadingText={t('utils.loadingMore')}
        noDataDescription={t('errorMessages.noContentFound')}
        noDataText={noDataText || t('errorMessages.noContent')}
        onDocumentClick={onItemClick}
      />
      {!loading && items.length >= 10 && (
        <Link
          className={cx(
            buttonStyle.button,
            buttonStyle[EButtonVariant.PRIMARY],
            buttonStyle[EButtonSize.BIG],
            styles.button
          )}
          data-test="see-more-link"
          role="button"
          to={`/document/${id}`}
        >
          {t('utils.seeMore')}
        </Link>
      )}
    </div>
  ) : (
    <div className={styles.nodata} data-test="no-data-message">
      {t('errorMessages.noContent')}
    </div>
  );
};

export default ThumbnailDocuments;
