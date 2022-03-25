import React from 'react';
import cx from 'classnames';
import {
  CountryCode,
  CurrencyCode,
  getCurrencySymbol,
  useInfiniteScroll,
} from '@redbull/common';
import Banner from '../Banner';
import FlyinInfo from '../FlyinInfo';
import CountryFlag from '../CountryFlag/CountryFlag';
import defaultBanner from '../../images/dashboard-banner.jpg';
import styles from './ContentLayout.module.scss';

type TContentLayout = {
  background: string | null;
  bannerClassName?: string;
  breadcrumbs?: React.ReactNode | React.ReactNodeArray;
  className?: string;
  countryCode?: CountryCode;
  currency?: CurrencyCode | null;
  description?: string;
  isMobile?: boolean;
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onScrollEnd?: () => void;
  title: string;
  withFlag?: boolean;
  withSideMenu?: boolean;
};
const ContentLayout = ({
  background = defaultBanner,
  bannerClassName,
  breadcrumbs,
  children,
  className,
  countryCode,
  currency,
  description,
  isMobile,
  onScroll,
  onScrollEnd,
  title,
  withFlag,
  withSideMenu,
}: React.PropsWithChildren<TContentLayout>) => {
  const [ref, handleOnScroll] = useInfiniteScroll<HTMLDivElement>(onScrollEnd);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    handleOnScroll();
    if (onScroll) {
      onScroll(e);
    }
  };

  return (
    <div
      ref={ref}
      className={cx(
        styles.container,
        withSideMenu && styles.withSideMenu,
        className
      )}
      onScroll={handleScroll}
    >
      <Banner
        className={cx(styles.banner, bannerClassName)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(background !== null && { image: background || defaultBanner })}
      >
        <div
          className={cx(
            styles.heading,
            breadcrumbs && styles.withBreadcrumbs,
            background === null && styles.noBackground
          )}
        >
          <div className={styles.left}>
            {/* BREADCRUMBS */}
            {breadcrumbs && (
              <div className={styles.breadcrumbs}>{breadcrumbs}</div>
            )}
            {/* TITLE + INFO */}
            <h1 className={styles.title}>
              {title}
              {description && (
                <FlyinInfo description={description} title={title} />
              )}
            </h1>
          </div>

          {/* COUNTRY FLAG */}
          {withFlag && countryCode && (
            <div className={styles.flag}>
              <CountryFlag code={countryCode} size={isMobile ? 'md' : 'lg'} />
              {currency && (
                <span className={styles.country}>
                  {currency}
                  {getCurrencySymbol(currency)}
                </span>
              )}
            </div>
          )}
        </div>
      </Banner>

      {children}
    </div>
  );
};

export default ContentLayout;
