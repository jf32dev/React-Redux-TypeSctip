import * as React from 'react';
import cx from 'classnames';

import { useInfiniteScroll } from '@redbull/common';
import TableRow from './TableRow';

import styles from './Table.module.scss';

type Props = {
  className?: string;
  extraHeaders?: React.ReactNode;
  headers: string[];
  onScrollEnd?: () => void;
  scrollable?: boolean;
};

const Table = ({
  children,
  className,
  extraHeaders,
  headers,
  onScrollEnd,
  scrollable = false,
}: React.PropsWithChildren<Props>) => {
  const [ref, handleOnScroll] = useInfiniteScroll<HTMLTableSectionElement>(
    onScrollEnd
  );

  return (
    <table
      className={cx(styles.table, scrollable && styles.scrollable, className)}
    >
      <thead>
        <tr>
          {headers.map((header: string) => (
            <th key={header} className={styles.header} scope="col">
              {header}
            </th>
          ))}
          {extraHeaders}
        </tr>
      </thead>
      <tbody ref={ref} onScroll={handleOnScroll}>
        {children}
      </tbody>
    </table>
  );
};

Table.Row = TableRow;

export default Table;
