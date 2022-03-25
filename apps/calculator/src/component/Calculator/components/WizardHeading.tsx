import * as React from 'react';

const Heading = ({
  activePage,
  children,
  resetForm,
  setValue,
  values,
}: React.PropsWithChildren<any>) => {
  if (typeof children === 'function') {
    return <div>{children({ activePage, resetForm, setValue, values })}</div>;
  }

  return <div>{children}</div>;
};

Heading.displayName = 'FormHeading';

export default Heading;
