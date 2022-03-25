import React from 'react';
import AppBar from '../AppBar';
import PrimaryMenu from './PrimaryMenu';
import PrimaryMenuItem from './PrimaryMenuItem';

export default {
  title: 'Primary Menu',
  component: PrimaryMenu,
};

export const InAppBar = () => (
  <AppBar primaryMenu={
    <PrimaryMenu>
      <PrimaryMenuItem label="Learn" to="/learn" />
      <PrimaryMenuItem label="Sell" to="/sell" />
      <PrimaryMenuItem label="Execute" to="/execute" />
    </PrimaryMenu>
    } 
  />
);
