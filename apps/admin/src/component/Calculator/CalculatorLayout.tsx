import * as React from 'react';
import { useParams } from 'react-router-dom';
import { capitalize, startCase } from 'lodash';

import Layout from '../Layout';
import Breadcrumbs from '../Breadcrumbs';
import { Breadcrumb } from '../Breadcrumbs/type';

type Props = {
  onScrollEnd?: () => void;
};

const CalculatorLayout = ({
  children,
  onScrollEnd,
}: React.PropsWithChildren<Props>) => {
  const params = useParams<
    Pick<Breadcrumb, 'dataType' | 'calcType' | 'country' | 'action'>
  >();
  const { dataType, calcType, country, action } = params;

  let pageTitle = 'Select Calculator';
  if (country && calcType && dataType) {
    pageTitle = `${country} - ${startCase(calcType)} ${startCase(dataType)} ${
      action ? ` - ${capitalize(action)} Product` : ''
    }`;
  }

  return (
    <Layout
      breadcrumbs={<Breadcrumbs />}
      pageTitle={pageTitle}
      onScrollEnd={onScrollEnd}
    >
      {children}
    </Layout>
  );
};

export default CalculatorLayout;
