import React from 'react';
import cx from 'classnames';

import { List, Loader } from '@redbull/components';
import { SearchFile } from '@redbull/services';

import { useTranslation } from 'react-i18next';
import FileItem from './FileItem';
import NoResult from './NoResult';

import styles from './File.module.scss';

type TProps = {
  files: SearchFile[];
  loading?: boolean;
  className?: string;
};

const FileBlock = ({ files, loading, className }: TProps) => {
  const { t } = useTranslation();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={cx(styles.block, className)}>
      <h3 className={styles.title}>{t('utils.files')}</h3>
      {files.length > 0 ? (
        <div className={styles.list}>
          <List>
            {files.map((file) => (
              <List.Item key={file.id} className={styles.item}>
                <List.ItemColumn>
                  <FileItem
                    category={file.category}
                    description={file.description}
                    id={file.id}
                    tags={file.tags}
                    thumbnail={file.thumbnail}
                  />
                </List.ItemColumn>
              </List.Item>
            ))}
          </List>
        </div>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

export default FileBlock;
