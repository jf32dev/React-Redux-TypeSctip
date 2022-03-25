import * as React from 'react';

import { useInfiniteScroll } from '@redbull/common';
import ApplicationListItem from './ApplicationListItem';

import styles from './ApplicationList.module.scss';

type Props = {
  onScrollEnd?: () => void;
};

const ApplicationList = ({
  children,
  onScrollEnd,
}: React.PropsWithChildren<Props>) => {
  const [ref, handleOnScroll] = useInfiniteScroll<HTMLUListElement>(
    onScrollEnd
  );

  return (
    <ul
      ref={ref}
      className={styles['application-list']}
      onScroll={handleOnScroll}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const { displayName } = (child as React.ReactElement).type as any;
          if (displayName === 'ApplicationListItem') {
            return child;
          }
        }
        return null;
      })}
    </ul>
  );
};

ApplicationList.Item = ApplicationListItem;
export default ApplicationList;
