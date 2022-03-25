import * as React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Loader, ELoaderSize } from '@redbull/components';

import { useTranslation } from 'react-i18next';
import SelectCalculator from './components/SelectCalculator';
import CalculatorContent from './components/CalculatorContent';
import CalculatorLayout from './components/CalculatorLayout';

import { useTypedSelector } from '../../store';
import { getCalculatorCountries } from '../../store/calculator/action';
import { BreakpointContext } from '../App/BreakpointContext';
import { ECalculatorType } from './shared/config';

import CalculatorBg from '../../images/calculator.jpg';

import styles from './Calculator.module.scss';

type CalculatorParams = {
  type: ECalculatorType;
};

const Calculator = () => {
  const { t } = useTranslation();
  const { type } = useParams<CalculatorParams>();
  const dispatch = useDispatch();
  const { isMobile } = React.useContext(BreakpointContext);

  const { loading, selectedCurrency, selectedCountry } = useTypedSelector(
    (state) => state.calculator
  );

  React.useEffect(() => {
    if (!selectedCountry) {
      dispatch(getCalculatorCountries());
    }
  }, [dispatch, selectedCountry]);

  if (loading || !selectedCountry) {
    return (
      <div className="loading">
        <Loader size={isMobile ? ELoaderSize.MEDIUM : ELoaderSize.LARGE} />
      </div>
    );
  }
  return !type ? (
    <Redirect to="/calculator/uplift-distribution" />
  ) : (
    <CalculatorLayout
      background={CalculatorBg}
      className={styles.calculator}
      countryCode={selectedCountry}
      currency={selectedCurrency}
      title={t('general.calculator')}
      withFlag
    >
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col4}>
              <SelectCalculator selected={type} />
            </div>
            <div className={styles.col8}>
              <CalculatorContent type={type} />
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default Calculator;
