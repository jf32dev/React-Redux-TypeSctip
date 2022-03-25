import * as React from 'react';
import PdfRenderer from './PdfRenderer';

const SaveButton = ({
  calculator,
  children,
  values,
}: React.PropsWithChildren<any>) => {
  return (
    <PdfRenderer calculator={calculator} document={children({ values })} />
  );
};

SaveButton.displayName = 'FormSaveButton';

export default SaveButton;
