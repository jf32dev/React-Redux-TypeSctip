import * as React from 'react';
import cx from 'classnames';

import { Button, EButtonVariant } from '@redbull/components';

import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../../store';

import styles from '../Calculator.module.scss';

type Props = {
  activePage: number;
  title: string;
  resetForm: () => void;
};

const CalculatorHeading = ({
  activePage,
  children,
  resetForm,
  title,
}: React.PropsWithChildren<Props>) => {
  const { t } = useTranslation();

  const { selectedCurrency, selectedCountry } = useTypedSelector(
    (state) => state.calculator
  );

  React.useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedCurrency]);

  return (
    <div className={cx(styles['heading-wrapper'])}>
      <div className={styles.title}>{title}</div>
      <div className={styles['content-wrapper']}>
        {activePage !== 0 && (
          <>
            {children}
            <div className={styles.recalculate}>
              <Button
                variant={EButtonVariant.SECONDARY_WHITE}
                onClick={resetForm}
              >
                {t('navigation.recalculate')}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CalculatorHeading;
