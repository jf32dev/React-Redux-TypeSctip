import * as React from 'react';

const Page = ({ children, setValue, values }: React.PropsWithChildren<any>) => {
  if (typeof children === 'function') {
    return <div>{children({ setValue, values })}</div>;
  }

  return <div>{children}</div>;
};

Page.displayName = 'FormPage';

export default Page;
