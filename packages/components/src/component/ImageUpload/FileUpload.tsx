import * as React from 'react';
import styles from './ImageUpload.module.scss';

type Props = {
  id: string;
  onChange?: (file: File) => void;
};

const FileUpload = ({ id, onChange }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      onChange && onChange(files[0]);
    }
  };

  return (
    <input
      className={styles.input}
      id={id}
      type="file"
      onChange={handleInputChange}
    />
  );
};

export default FileUpload;
