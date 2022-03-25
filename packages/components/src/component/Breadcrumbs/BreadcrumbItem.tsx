import React from 'react';
import cx from 'classnames';
import styles from './Breadcrumbs.module.scss';

const BreadcrumbItem = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <li className={cx(styles.item, className)}>{children}</li>;
};

BreadcrumbItem.displayName = 'BreadcrumbItem';
export default BreadcrumbItem;
