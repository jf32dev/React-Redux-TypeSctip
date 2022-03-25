import React from 'react';
import AppBar from './components/AppBar';

import '@redbull/common/style/global.scss';

type Props = {
  useHeader?: boolean;
};

const Layout = ({
  useHeader = true,
  children,
}: React.PropsWithChildren<Props>) => (
  <>
    {useHeader && <AppBar />}
    {children}
  </>
);

export default Layout;
