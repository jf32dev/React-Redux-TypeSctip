import React from 'react';

import '@redbull/common/style/global.scss';

type Props = {
  useHeader?: boolean;
};

const Layout = ({ children }: React.PropsWithChildren<Props>) => (
  <>{children}</>
);

export default Layout;
