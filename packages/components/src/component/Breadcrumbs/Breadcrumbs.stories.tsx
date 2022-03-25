import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '.';

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
};

export const Default = () => {
  const breadcrumbs = [
    { label: 'Home', route: '/' },
    { label: 'Incentives', route: '/earn' },
  ];

  return (
    <div style={{ padding: '20px', width: '620px' }}>
      <Breadcrumbs>
        <Breadcrumbs.Item>
          <Link to="/">Home</Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Link to="/earn">Incentives</Link>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  );
};

Default.story = {
  name: 'Breadcrumbs',
};
