import * as React from 'react';
import cx from 'classnames';
import { ReactComponent as FileUploadIcon } from '@redbull/common/icons/drop-file.svg';
import FileUpload from './FileUpload';
import { Button, EButtonVariant } from '../Button';
import styles from './ImageUpload.module.scss';

type Props = {
  id: string;
  invalid?: boolean;
  isDragging: boolean;
  onChange: (file: File) => void;
};

const DndArea = React.forwardRef(
  (
    { id, invalid, isDragging, onChange }: Props,
    ref: React.Ref<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      className={cx(
        styles['active-area'],
        isDragging && styles['is-active'],
        invalid && styles.invalid
      )}
    >
      {isDragging ? (
        <div className={styles.overlay} />
      ) : (
        <FileUpload id={id} onChange={onChange} />
      )}

      <FileUploadIcon className={styles.icon} />
      <span>Drag and drop here to attach or</span>
      <Button className={styles.upload} variant={EButtonVariant.PRIMARY}>
        Upload
      </Button>
    </div>
  )
);

DndArea.displayName = 'DndArea';

export default DndArea;
