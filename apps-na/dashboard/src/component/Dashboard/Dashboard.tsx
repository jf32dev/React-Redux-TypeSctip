import * as React from 'react';
import cx from 'classnames';

import {
  Accordion,
  Banner,
  CardContainer,
  UserProfile,
  EUserProfileSize,
  Button,
} from '@redbull/components';
import { useTranslation } from 'react-i18next';
import { EBannerAlign } from '@redbull/components/src/component/Banner';
import Tools from './components/Tools';
import MyDocuments from './components/MyDocuments';
import FeaturedStories from './FeaturedStories';

import { useTypedSelector } from '../../store/index';

import banner from '../../images/dashboard-banner.jpg';
import bannerMobile from '../../images/dashboard-mobile.jpg';

import styles from './Dashboard.module.scss';
import { useBreakpointContext } from '../../context/Breakpoint';
import PremiseStatus from './components/PremiseStatus/PremiseStatus';

const Dashboard = () => {
  const { t } = useTranslation();

  const {
    loginUser: { firstName, thumbnail, points },
    premise,
  } = useTypedSelector((state) => state.config);

  const { viewport, isMobile, isPortrait } = useBreakpointContext();
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
        align={EBannerAlign.CENTER}
        className={styles.banner}
        image={viewport !== 'xs' ? banner : bannerMobile}
        justify="between"
      >
        <div className={styles['banner-content']}>
          <UserProfile
            imageSrc={thumbnail}
            size={isMobile ? EUserProfileSize.SMALL : EUserProfileSize.MEDIUM}
          />
          <div className={styles.welcome}>
            <h2>{welcomeTitle}</h2>
            {points && <h3>{points} PTS</h3>}
          </div>
        </div>

        {premise.belongsTo === 'both' ? (
          <Button.Group>
            <PremiseStatus active={premise.selected === 'ONP'} premise="ONP" />
            <PremiseStatus active={premise.selected === 'OFP'} premise="OFP" />
          </Button.Group>
        ) : (
          <PremiseStatus premise={premise.selected} disabled />
        )}
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
