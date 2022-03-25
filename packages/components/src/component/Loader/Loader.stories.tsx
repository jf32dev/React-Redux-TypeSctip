import React from 'react';
import Loader from './Loader';
import { ELoaderSize, ELoaderBackground } from './enum';

export default {
  title: 'Loader',
  component: Loader,
};

export const Default = () => (
  <>
    <Loader size={ELoaderSize.LARGE} />
    <Loader
      background={ELoaderBackground.RED}
      size={ELoaderSize.MEDIUM}
      text="loading..."
    />
    <Loader size={ELoaderSize.SMALL} text="loading..." />
    <Loader size={ELoaderSize.XSMALL} text="loading..." />
  </>
);
