import * as React from 'react';
import cx from 'classnames';
import { uniqueId } from 'lodash';
import styles from './ImagePreview.module.scss';

type Props = {
  className?: string;
  id?: string;
  label?: string;
  img: string;
};

const ImagePreview = ({ className, id, label, img }: Props) => {
  const [autoId] = React.useState(uniqueId('preview_'));

  const [preview, setPreview] = React.useState<string>('');
  const [imageError, setImageError] = React.useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true);
  };

  React.useEffect(() => {
    if (img !== preview) {
      setPreview(img);
      setImageError(false);
    }
  }, [img, preview]);

  return (
    <div className={cx(styles.container, className)}>
      <label className={styles.label} htmlFor={id || autoId}>
        {label}
      </label>
      <div className={styles.preview}>
        {!imageError ? (
          <img alt={label} src={img} onError={handleImageError} />
        ) : (
          <span>Preview could not be loaded.</span>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
