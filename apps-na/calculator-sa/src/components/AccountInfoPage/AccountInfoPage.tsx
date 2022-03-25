import * as React from 'react';
import { Input, SingleDatePicker } from '@redbull/components';
import styles from './AccountInfoPage.module.scss';

const AccountInfoPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles['account-info-title']}>ACCOUNT INFO</div>
      <SingleDatePicker />
      <div className={styles['account-info-form']}>
        <div className={styles['account-info-detail']}>
          <text>Sales Rep Name</text>
          <Input containerClassName={styles.input} />
        </div>
        <div className={styles['account-info-detail']}>
          <text>Distributor Partner</text>
          <Input containerClassName={styles.input} placeholder="Sales Rep" />
        </div>
        <div className={styles['account-info-detail']}>
          <text>Store Name</text>
          <Input containerClassName={styles.input} />
        </div>
        <div className={styles['account-info-detail']}>
          <text>Store City</text>
          <Input containerClassName={styles.input} />
        </div>
        <div className={styles['account-info-detail']}>
          <text>Store #</text>
          <Input containerClassName={styles.input} />
        </div>
        <div className={styles['account-info-date']}>
          <p>Date</p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoPage;
