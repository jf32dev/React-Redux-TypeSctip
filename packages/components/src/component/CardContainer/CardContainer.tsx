import * as React from 'react';
import cx from 'classnames';
import { useInfiniteScroll } from '@redbull/common';
import styles from './CardContainer.module.scss';

type Props = {
  className?: string;
  onScrollEnd?: () => void;
};

const CardContainer = ({
  className,
  onScrollEnd,
  children,
}: React.PropsWithChildren<Props>) => {
  const [ref, handleOnScroll] = useInfiniteScroll<HTMLDivElement>(onScrollEnd);

  return (
    <div
      ref={ref}
      className={cx(styles.container, className)}
      onScroll={handleOnScroll}
    >
      {children}
    </div>
  );
};

export default CardContainer;
