import React from 'react';
import ThumbnailDocument from './ThumbnailDocument';

import Placeholder from '../../images/placeholder-thumbnail.png';

export default {
  title: 'Thumbnail Document',
  component: ThumbnailDocument,
};

const item = {
  id: 1,
  image: Placeholder,
  type: 'PPTX',
  category: 'file',
  description: 'Industry Insights Presentation',
};

export const Thumbnail = () => <ThumbnailDocument item={item} />;
