import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Loader, NoDataError } from '@redbull/components';

import { useTypedSelector } from '../../../store';
import { getCalculatorList } from '../../../store/calculator/action';

import CalculatorLayout from '../CalculatorLayout';
import SelectCalculatorRow from './SelectCalculatorRow';
import { getCalculatorIcon } from './utils';

import styles from './SelectCalculator.module.scss';

const SelectCalculator = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data, status, hasMore } = useTypedSelector(
    (state) => state.calculator.list
  );

  const isFirstLoad = data.length === 0 && status === 'loading';

  const handleCalculatorClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLButtonElement;
    const { datatype, country, calctype, calcid } = target.dataset;
    history.push(`/calculator/${datatype}/${country}/${calctype}/${calcid}`);
  };

  const handleLoadMore = () => {
    if (hasMore && status !== 'loading') {
      dispatch(getCalculatorList());
    }
  };

  React.useEffect(() => {
    if (!data.length) {
      dispatch(getCalculatorList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CalculatorLayout onScrollEnd={handleLoadMore}>
      {isFirstLoad && <Loader className={styles['loading-calculator']} />}
      {!isFirstLoad && data.length === 0 && (
        <NoDataError
          className={styles['no-calculator']}
          title="No Available Calculator"
        />
      )}
      {data.map((calc) => (
        <SelectCalculatorRow
          key={calc.id}
          calculator={calc}
          icon={getCalculatorIcon(calc.name)}
          onClick={handleCalculatorClick}
        />
      ))}
      {status === 'loading' && !isFirstLoad && (
        <Loader text="loading more..." />
      )}
    </CalculatorLayout>
  );
};

export default SelectCalculator;
