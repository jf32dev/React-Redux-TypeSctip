import * as React from 'react';
import cx from 'classnames';
import styles from '../SliderData.module.scss';

const TableHeading = () => (
  <div className={cx(styles.row, styles.heading)}>
    <div className={styles.column}>Slider name</div>
    <div className={styles.column}>Minimum</div>
    <div className={styles.column}>Maximum</div>
    <div className={styles.column}>Default Value</div>
    <div className={styles.column}>Units</div>
  </div>
);

export default TableHeading;
