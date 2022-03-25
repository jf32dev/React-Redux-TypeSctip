import * as React from 'react';
import cx from 'classnames';
import styles from './Table.module.scss';

type Props = {
  className?: string;
};
const TableRow = ({ children, className }: React.PropsWithChildren<Props>) => (
  <tr className={cx(styles.row, className)}>{children}</tr>
);

export default TableRow;
