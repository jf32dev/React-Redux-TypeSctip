import * as React from 'react';
import cx from 'classnames';

import styles from './SubMenu.module.scss';

type Props = {
  children: React.ReactNode;
  level: 1 | 2;
};

/**
 * Displays expandable SubMenu for Menu.Heading
 * Takes Menu.Heading or Menu.Item as children
 */
const SubMenu = ({ children, level }: Props) => {
  let validChildren = null;

  validChildren = React.Children.toArray(children).filter((child) => {
    const { displayName } = (child as React.ReactElement).type as any;
    if (displayName) {
      if (
        [
          'MenuItem',
          'MenuHeading',
          'AccountNavigation',
          'ChannelNavigation',
        ].includes(displayName)
      ) {
        return true;
      }
    }
    if ((child as React.ReactElement).type === 'span') {
      return true;
    }
    return false;
  });
  if (!validChildren) {
    throw new Error(
      'Menu.SubMenu can render only Menu.Heading or Menu.Item components. There are no valid children.'
    );
  }

  return (
    <ul className={cx(styles.container, styles[`level-${level}`], 'submenu')}>
      {validChildren}
    </ul>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
