import * as React from 'react';
import cx from 'classnames';

import { IApplication } from '../../../api/services/application/type';

import styles from './ApplicationRowDetail.module.scss';

type Props = {
  application: IApplication;
  className?: string;
};

const ApplicationRowDetail = ({ application, className }: Props) => {
  return (
    <div className={cx(styles['application-row-detail'], className)}>
      <div className={cx(styles.column, styles.wide)}>
        <b>Name</b>
        <span>
          {application.firstName} {application.lastName}
        </span>
      </div>
      <div className={cx(styles.column, styles.wide)}>
        <b>Contact</b>
        <span>{application.email}</span>
      </div>
      <div className={styles.column}>
        <b>Country of Work</b>
        <span>{application.country?.name || 'Not specified'}</span>
      </div>
      <div className={styles.column}>
        <b>Region / City</b>
        <span>{application.region?.name || 'Not specified'}</span>
      </div>
      <div className={styles.column}>
        <b>Language</b>
        <span>{application.language?.name || 'Not specified'}</span>
      </div>
      <div className={styles.column}>
        <b>DP or Agency</b>
        <span>{application.agency}</span>
      </div>
    </div>
  );
};

export default ApplicationRowDetail;
