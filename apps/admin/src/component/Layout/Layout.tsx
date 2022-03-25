import * as React from 'react';
import { CardContainer, ContentLayout } from '@redbull/components';
import styles from './Layout.module.scss';

type Props = {
  pageTitle: string;
  breadcrumbs?: React.ReactNode;
  onScrollEnd?: () => void;
};

const Layout = ({
  pageTitle,
  children,
  breadcrumbs,
  onScrollEnd,
}: React.PropsWithChildren<Props>) => {
  return (
    <ContentLayout
      background={null}
      breadcrumbs={breadcrumbs}
      title={pageTitle}
    >
      <CardContainer className={styles.card} onScrollEnd={onScrollEnd}>
        {children}
      </CardContainer>
    </ContentLayout>
  );
};

export default Layout;
