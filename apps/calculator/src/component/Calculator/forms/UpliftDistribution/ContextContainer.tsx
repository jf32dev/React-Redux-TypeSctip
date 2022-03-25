import * as React from 'react';
import { selectReducer } from '../../store/form/reducer';
import {
  UpliftCalculatorContext,
  upliftCalculatorState,
} from './store/context';
import UpliftDistribution from './UpliftDistribution';

const ContextContainer = () => {
  // if need more than the global select calculator reducer
  // create a separate reducer and its state on this store folder
  // combine it using a custom combine reducer.
  // example:
  // const combinedReducers = combineCalculatorReducers({named: reducerA, select: selectReducer});
  // const [state, dispatch] = React.useReducer(combinedReducer, {select: upliftCalculatorState, named: stateA});

  const [state, dispatch] = React.useReducer(
    selectReducer,
    upliftCalculatorState
  );

  return (
    <UpliftCalculatorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <UpliftDistribution />
    </UpliftCalculatorContext.Provider>
  );
};

export default ContextContainer;
