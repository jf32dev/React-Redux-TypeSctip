import * as React from 'react';

import TradeUp from './TradeUp';
import { selectReducer } from '../../store/form/reducer';
import {
  tradeUpCalculatorState,
  TradeUpCalculatorContext,
} from './store/context';

const ContextContainer = () => {
  // if need more than the global select calculator reducer
  // create a separate reducer and its state on this store folder
  // combine it using a custom combine reducer.
  const [state, dispatch] = React.useReducer(
    selectReducer,
    tradeUpCalculatorState
  );

  return (
    <TradeUpCalculatorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <TradeUp />
    </TradeUpCalculatorContext.Provider>
  );
};

export default ContextContainer;
