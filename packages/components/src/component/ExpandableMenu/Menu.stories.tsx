import React from 'react';
import Menu from './Menu';

export default {
  title: 'Expandable Menu',
  component: Menu,
};

export const Vertical = () => (
  <Menu>
    <Menu.Heading id={1} label="Learn">
      <Menu.SubMenu level={1}>
        <Menu.Heading id={2} label="Perfect Store">
          <Menu.SubMenu level={2}>
            <Menu.Item label="Availability" linkTo="/availability" />
            <Menu.Item label="Shelf Space" linkTo="/shelf-space" />
            <Menu.Item label="Pricing" linkTo="/" />
          </Menu.SubMenu>
        </Menu.Heading>
        <Menu.Heading id={3} label="Red Bull Products">
          <Menu.SubMenu level={2}>
            <Menu.Item label="Energy Drink" linkTo="/energy-drink" />
            <Menu.Item label="Sugar Free" linkTo="/sugar-free" />
            <Menu.Item label="Zero" linkTo="/zero" />
          </Menu.SubMenu>
        </Menu.Heading>
        <Menu.Item label="Brand" linkTo="/brand" />
        <Menu.Item label="Sales Training" linkTo="/" />
      </Menu.SubMenu>
    </Menu.Heading>
    <Menu.Item label="Sales Training" linkTo="/" />
  </Menu>
);
