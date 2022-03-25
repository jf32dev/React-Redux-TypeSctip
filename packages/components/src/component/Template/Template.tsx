import * as React from 'react';
import styles from './Template.module.scss';

type Props = {
  props: any;
};

const Template = ({ props = 'Hello' }: Props) => {
  const sample = props;

  return <div className={styles.container}>{sample}</div>;
};

export default Template;
