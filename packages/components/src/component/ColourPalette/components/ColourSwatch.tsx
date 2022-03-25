import * as React from 'react';
import styles from '../ColourPalette.module.scss';

type Props = {
  colour: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const ColourSwatch = ({ colour, onClick }: Props) => (
  <div
    className={styles.swatch}
    data-colour={colour}
    style={{ backgroundColor: colour }}
    onClick={onClick}
  />
);

export default ColourSwatch;
