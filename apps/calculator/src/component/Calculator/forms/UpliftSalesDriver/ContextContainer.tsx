import * as React from 'react';
import UpliftSalesDriver from './UpliftSalesDriver';
import {
  UpliftSalesContext,
  upliftSalesCalculatorState,
} from './store/context';
import { selectReducer } from '../../store/form/reducer';

const ContextContainer = () => {
  const [state, dispatch] = React.useReducer(
    selectReducer,
    upliftSalesCalculatorState
  );

  return (
    <UpliftSalesContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <UpliftSalesDriver />
    </UpliftSalesContext.Provider>
  );
};

export default ContextContainer;
