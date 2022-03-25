import * as React from 'react';
import cx from 'classnames';
import RedBullImg from '@redbull/common/images/redbull.png';
import styles from './NoDataError.module.scss';

type TEmptyState = {
  image?: string;
  title: string;
  className?: string;
};
const EmptyState = ({
  image,
  title,
  children,
  className,
}: React.PropsWithChildren<TEmptyState>) => {
  return (
    <div className={cx(styles.container, className)}>
      <img alt="" src={image || RedBullImg} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{children}</p>
    </div>
  );
};

export default EmptyState;
