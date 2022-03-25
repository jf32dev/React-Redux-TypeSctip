import * as React from 'react';
import cx from 'classnames';
import styles from '../ColourPalette.module.scss';

type Props = {
  colour: string;
  theme: 'light' | 'dark';
};

const SelectedColour = ({ colour, theme }: Props) => (
  <div
    className={cx(styles.active, styles[theme])}
    style={{ backgroundColor: colour }}
  >
    <div className={styles.name}>{colour}</div>
  </div>
);

export default SelectedColour;
