import * as React from 'react';

import { MenuContext } from './MenuContext';
import MenuHeading from './MenuHeading';
import MenuHeadingNavigation from './MenuHeadingNavigation';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

import styles from './Menu.module.scss';

type Props = {
  children: React.ReactNodeArray | React.ReactNode;
};

/**
 * Displays vertical expandable Menu.
 * Menu will only render Menu.Heading or Menu.Item components
 * Structure:
 *  - <Menu>
 *  -- <Menu.Item> or <Menu.Heading>
 *  -- if <Menu.Heading>
 *  --- <Menu.SubMenu>
 *  ---- <Menu.Item>
 */
const Menu = ({ children }: Props) => {
  const validChildren = React.Children.toArray(children).filter((child) => {
    const { displayName } = (child as React.ReactElement).type as any;
    if (displayName) {
      if (
        ['MenuHeading', 'MenuItem', 'MenuHeadingNavigation'].includes(
          displayName
        )
      ) {
        return true;
      }
    }
    return false;
  });

  if (!validChildren) {
    throw new Error(
      'Menu component can render only Menu.Heading or Menu.Item components. There are no valid children.'
    );
  }

  return (
    <MenuContext.Provider value={{}}>
      <ul className={styles.container}>{validChildren}</ul>
    </MenuContext.Provider>
  );
};

Menu.Item = MenuItem;
Menu.Heading = MenuHeading;
Menu.HeadingNav = MenuHeadingNavigation;
Menu.SubMenu = SubMenu;

export default Menu;
