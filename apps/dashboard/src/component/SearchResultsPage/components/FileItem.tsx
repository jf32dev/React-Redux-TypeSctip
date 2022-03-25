import React from 'react';
import { Tag } from '@redbull/components';
import { EEntityType, SearchFile } from '@redbull/services';

import bridgeServices from '../../../api/service';
import { getFileName } from '../../../utils/formatter';

import defaultImg from '../../../images/redbull-default.png';

import styles from './File.module.scss';

type TProps = Pick<
  SearchFile,
  'category' | 'description' | 'id' | 'tags' | 'thumbnail'
>;

const FileItem = ({ category, description, id, tags, thumbnail }: TProps) => {
  const onImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.src = defaultImg;
  };

  const handleOpenFile = () => {
    bridgeServices.openEntity({
      entityName: EEntityType.FILE,
      id,
      disableLegacyRouting: true,
    });
  };

  const fileName = getFileName(description).filename;

  return (
    <div className={styles.file} onClick={handleOpenFile}>
      <img
        alt={fileName}
        className={styles.thumbnail || defaultImg}
        src={thumbnail}
        onError={onImgError}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{fileName}</h3>
        <div className={styles.tags}>
          <Tag name={category} type={category} />
          {tags.map((tag) => (
            <Tag key={tag.name} name={tag.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileItem;
