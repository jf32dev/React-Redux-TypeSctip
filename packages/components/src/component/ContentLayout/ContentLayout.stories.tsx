import React from 'react';
import ContentLayout from './ContentLayout';

export default {
  title: 'ContentLayout',
  component: ContentLayout,
};

export const Default = () => (
  <ContentLayout title="Title" background={null}>
    Sample content
  </ContentLayout>
);
