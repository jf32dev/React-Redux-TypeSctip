import * as React from 'react';
import ImageUpload from './ImageUpload';

export default {
  title: 'Image Upload',
  component: ImageUpload,
};

export const Default = () => {
  const onChange = (file: File | null) => {
    console.log('File Uploaded: ', file);
  };

  return <ImageUpload label="Image" onChange={onChange} />;
};
