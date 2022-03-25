import React from 'react';
import RedBullImg from '@redbull/common/images/redbull.png';
import { useTranslation } from 'react-i18next';
import styles from './NoResult.module.scss';

const NoResult = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <img alt={t('errorMessages.noResults')} src={RedBullImg} />
      <h3 className={styles.title}>{t('errorMessages.noResults')}</h3>
      <p className={styles.description}>{t('errorMessages.noResultsSearch')}</p>
    </div>
  );
};

export default NoResult;
