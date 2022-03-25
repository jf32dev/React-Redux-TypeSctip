import * as React from 'react';
import styles from '../ColourPalette.module.scss';

type Props = {
  error: string;
};

const ErrorMessage = ({ error }: Props) => (
  <div className={styles.error}>{error}</div>
);

export default ErrorMessage;
