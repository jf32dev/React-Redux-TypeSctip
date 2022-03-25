import * as React from 'react';
import cx from 'classnames';
import { uniqueId } from 'lodash';

import DndArea from './DndArea';
import ErrorMessage from './ErrorMessage';

import styles from './ImageUpload.module.scss';

type Props = {
  className?: string;
  id?: string;
  label?: string;
  onChange: (file: File) => void;
  error?: string;
};

const ImageUpload = ({ className, error, id, label, onChange }: Props) => {
  const dndArea = React.useRef<HTMLDivElement>(null);

  const [autoId] = React.useState(uniqueId('image_'));
  const [isDragging, setDragging] = React.useState(false);

  // NOTE: validation is performed in Final Form Field
  const handleChange = React.useCallback((file: File) => onChange(file), [
    onChange,
  ]);

  const handleDragIn = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer) {
      return;
    }
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  // this prevents browser opening the document itself
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = React.useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);

      if (!e.dataTransfer) {
        return;
      }

      const { files } = e.dataTransfer;

      if (files) {
        handleChange(files[0]);
        e.dataTransfer.clearData();
      }
    },
    [handleChange]
  );

  React.useEffect(() => {
    const refCurrent = dndArea.current;

    if (refCurrent) {
      refCurrent.addEventListener('dragenter', handleDragIn);
      refCurrent.addEventListener('dragleave', handleDragOut);
      refCurrent.addEventListener('dragover', handleDragOver);
      refCurrent.addEventListener('drop', handleDrop);
    }
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('dragenter', handleDragIn);
        refCurrent.removeEventListener('dragleave', handleDragOut);
        refCurrent.removeEventListener('dragover', handleDragOver);
        refCurrent.removeEventListener('drop', handleDrop);
      }
    };
  }, [handleDrop]);

  return (
    <div className={cx(styles.container, className)}>
      <label className={styles.label} htmlFor={id || autoId}>
        {label}
      </label>

      <DndArea
        ref={dndArea}
        id={id || autoId}
        invalid={!!error}
        isDragging={isDragging}
        onChange={handleChange}
      />

      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default ImageUpload;
