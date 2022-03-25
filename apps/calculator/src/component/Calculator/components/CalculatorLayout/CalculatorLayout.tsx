import React from 'react';
import cx from 'classnames';
import { CountryCode, CurrencyCode, getCurrencySymbol } from '@redbull/common';
import { ReactComponent as Cross } from '@redbull/common/icons/cross.svg';
import {
  Banner,
  Button,
  CountryFlag,
  EButtonVariant,
  FlyinInfo,
} from '@redbull/components';
import defaultBanner from '@redbull/components/src/images/dashboard-banner.jpg';
import { useTranslation } from 'react-i18next';
import useCloseCalculator from '../../../../hooks/useCloseCalculator';

import styles from './CalculatorLayout.module.scss';

type TContentLayout = {
  title: string;
  background: string | null;
  className?: string;
  bannerClassName?: string;
  countryCode?: CountryCode;
  currency?: CurrencyCode | null;
  description?: string;
  withFlag?: boolean;
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};
const ContentLayout = ({
  background = defaultBanner,
  bannerClassName,
  children,
  className,
  countryCode,
  currency,
  description,
  onScroll,
  title,
  withFlag,
}: React.PropsWithChildren<TContentLayout>) => {
  const { t } = useTranslation();
  const [close] = useCloseCalculator();
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (onScroll) {
      onScroll(e);
    }
  };

  return (
    <div className={cx(styles.container, className)} onScroll={handleScroll}>
      <Banner
        className={cx(styles.banner, bannerClassName)}
        image={background || defaultBanner}
      >
        <Button
          className={styles.close}
          variant={EButtonVariant.BUTTON_HIDDEN}
          onClick={close}
        >
          <span className="icon">
            <Cross />
          </span>
          {t('navigation.close')}
        </Button>
        <div className={styles.heading}>
          <h1 className={styles.title}>
            {title}
            {description && (
              <FlyinInfo description={description} title={title} />
            )}
          </h1>
          {withFlag && countryCode && (
            <div className={styles['country-wrapper']}>
              <CountryFlag
                className={styles.flag}
                code={countryCode}
                size="md"
              />
              {currency && (
                <span className={styles.currency}>
                  {currency} {getCurrencySymbol(currency)}
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
