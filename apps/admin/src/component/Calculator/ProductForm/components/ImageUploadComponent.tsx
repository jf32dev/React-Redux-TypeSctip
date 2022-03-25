import * as React from 'react';
import { FormSpy } from 'react-final-form';
import { ImagePreview } from '@redbull/components';
import FieldImage from './FieldImage';
import styles from '../ProductForm.module.scss';

type Props = {
  setValue: (...args: any) => void;
};

const ImageUploadComponent = ({ setValue }: Props) => (
  <>
    <div className={styles.col}>
      <FieldImage
        acceptedFiles={['png', 'jpg']}
        label="Image"
        maxFileSize={5}
        name="image"
        setValue={setValue}
      />
    </div>
    <FormSpy subscription={{ values: true }}>
      {({ values }: any) =>
        values.preview ? (
          <div className={styles.col}>
            <ImagePreview img={values.preview} label="Preview" />
          </div>
        ) : null
      }
    </FormSpy>
  </>
);

export default ImageUploadComponent;
