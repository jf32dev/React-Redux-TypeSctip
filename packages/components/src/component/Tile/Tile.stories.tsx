import React from 'react';
import Tile from './Tile';
import { ReactComponent as Calculator } from '@redbull/common/icons/calculator.svg';

export default {
  title: 'Tile',
  component: Tile,
};

export const Default = () => (
  <Tile icon={<Calculator />} type="navigation" title="Calculator" linkTo="/" />
);
