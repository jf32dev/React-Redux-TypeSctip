/* eslint-disable react/no-array-index-key */
import React from 'react';
import cx from 'classnames';
import { ReactComponent as Arrow } from '@redbull/common/icons/arrow-right.svg';
import styles from './Breadcrumbs.module.scss';
import BreadcrumbItem from './BreadcrumbItem';

type BreadcrumbsProps = {
  wrapperClassName?: string;
  className?: string;
};

const Breadcrumbs = ({
  children,
  wrapperClassName,
  className,
}: React.PropsWithChildren<BreadcrumbsProps>) => {
  const validChildren = React.Children.toArray(children).filter((child) => {
    const { displayName } = (child as React.ReactElement).type as any;
    if (displayName) {
      if (displayName === 'BreadcrumbItem') {
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
    <div className={cx(styles['breadcrumbs-wrapper'], wrapperClassName)}>
      <ul className={cx(styles.breadcrumbs, className)}>
        {React.Children.map(validChildren, (child, i) => {
          return (
            <React.Fragment key={i}>
              {child}
              {i !== validChildren.length - 1 && <Arrow />}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

Breadcrumbs.Item = BreadcrumbItem;
export default Breadcrumbs;
