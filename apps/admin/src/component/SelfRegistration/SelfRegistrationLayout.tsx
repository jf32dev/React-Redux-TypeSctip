import * as React from 'react';
import Layout from '../Layout';

const SelfRegistrationLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return <Layout pageTitle="Self Registration">{children}</Layout>;
};

export default SelfRegistrationLayout;
