import React from 'react';
import FeaturedStory from './FeaturedStory';
import Placeholder from '../../../../images/placeholder-featured.png';

export default {
  title: 'Feature Story',
  component: FeaturedStory,
};

const item = {
  id: 1,
  title: 'New Editions',
  image: Placeholder,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
};

export const Card = () => <FeaturedStory item={item} />;
