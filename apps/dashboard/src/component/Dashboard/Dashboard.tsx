import * as React from 'react';
import cx from 'classnames';

import {
  Accordion,
  Banner,
  CardContainer,
  UserProfile,
  EUserProfileSize,
} from '@redbull/components';
import { useTranslation } from 'react-i18next';
import Tools from './components/Tools';
import MyDocuments from './components/MyDocuments';
import FeaturedStories from './FeaturedStories';

import { BreakpointContext } from '../App/BreakpointContext';

import { useTypedSelector } from '../../store/index';

import banner from '../../images/dashboard-banner.jpg';
import bannerMobile from '../../images/dashboard-mobile.jpg';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { t } = useTranslation();

  const { firstName, thumbnail } = useTypedSelector(
    (state) => state.config.loginUser
  );
  const { viewport, isMobile, isPortrait } = React.useContext(
    BreakpointContext
  );
  const handleAccordionClick = (accordion: HTMLDivElement) => {
    setTimeout(
      () =>
        accordion.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        }),
      200
    );
  };

  const welcomeTitle = (firstName
    ? `${t('dashboard.welcome')}, ${firstName}!`
    : `${t('dashboard.welcome')}!`
  ).toUpperCase();

  return (
    <div className={styles.wrapper}>
      <Banner
        className={styles.banner}
        image={viewport !== 'xs' ? banner : bannerMobile}
      >
        <div className={styles['banner-content']}>
          <UserProfile
            imageSrc={thumbnail}
            size={isMobile ? EUserProfileSize.SMALL : EUserProfileSize.MEDIUM}
          />
          <h2 className={styles.welcome}>{welcomeTitle}</h2>
        </div>
      </Banner>
      <FeaturedStories className={styles.featured} />
      {/* My Docs + My Tools */}
      <div className={cx(styles.container, styles['docs-tools'])}>
        <div className={styles.row}>
          {viewport !== 'xs' ? (
            <>
              <div
                className={
                  isPortrait
                    ? cx(styles.col12, styles['bottom-gap'])
                    : styles.col8
                }
              >
                <CardContainer className={styles.card}>
                  <h3 className={styles.title}>
                    {t('dashboard.myDocuments').toUpperCase()}
                  </h3>
                  <MyDocuments />
                </CardContainer>
              </div>
              <div className={isPortrait ? styles.col12 : styles.col4}>
                <CardContainer className={styles.card}>
                  <h3 className={styles.title}>
                    {t('dashboard.myTools').toUpperCase()}
                  </h3>
                  <Tools />
                </CardContainer>
              </div>
            </>
          ) : (
            <div className={styles.col}>
              <Accordion className={styles['no-gap']}>
                <Accordion.Item
                  className={styles['accordion-item']}
                  id="documents"
                  title={t('dashboard.myDocuments')}
                  onClick={handleAccordionClick}
                >
                  <MyDocuments />
                </Accordion.Item>
                <Accordion.Item
                  className={styles['accordion-item']}
                  id="tools"
                  title={t('dashboard.myTools')}
                  onClick={handleAccordionClick}
                >
                  <Tools />
                </Accordion.Item>
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
