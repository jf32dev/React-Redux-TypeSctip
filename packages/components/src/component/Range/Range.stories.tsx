import React from 'react';
import Range from './Range';

export default {
  title: 'Range',
  component: Range,
};

export const Default = () => (
  <>
    <Range label="Test" name="test" eurLocale={undefined} />
    <Range
      error
      errorMessage="This is an error message."
      eurLocale={undefined}
      label="Error Test"
      name="errorTest"
    />
  </>
);
