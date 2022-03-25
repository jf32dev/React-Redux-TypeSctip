import * as React from 'react';
import cx from 'classnames';
import PrimaryMenuItem from './PrimaryMenuItem';
import styles from './PrimaryMenu.module.scss';

const PrimaryMenu = ({ children, className }: React.PropsWithChildren<any>) => {
  const validChildren = React.Children.toArray(children).filter((child) => {
    const { displayName } = (child as React.ReactElement).type as any;
    if (displayName && displayName === 'PrimaryMenuItem') {
      return true;
    }
    return false;
  });

  if (!validChildren) {
    throw new Error(
      'PrimaryMenu component can render only PrimaryMenu.Item components as a children. There are no valid children.'
    );
  }

  return <ul className={cx(styles.container, className)}>{validChildren}</ul>;
};

PrimaryMenu.Item = PrimaryMenuItem;

export default PrimaryMenu;
