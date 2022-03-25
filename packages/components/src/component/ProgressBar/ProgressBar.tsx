import * as React from 'react';
import cx from 'classnames';
import { ReactComponent as Tick } from '@redbull/common/icons/tick-small.svg';
import styles from './ProgressBar.module.scss';

type Props = {
  activeStepId: number;
  className?: string;
  steps: { id: number; label: string }[];
};

const ProgressBar = ({ activeStepId, className, steps }: Props) => (
  <div className={cx(styles.container, className)}>
    {steps.map((step, i) => (
      <div
        key={step.id}
        className={cx(styles.step, activeStepId === step.id && styles.active)}
      >
        <div className={styles['label-wrapper']}>
          <div className={styles.number}>{i + 1}</div>
          <div className={styles.label}>{step.label}</div>
          <Tick className={styles.tick} />
        </div>
        <div className={styles.edge} />
      </div>
    ))}
  </div>
);

export default ProgressBar;
