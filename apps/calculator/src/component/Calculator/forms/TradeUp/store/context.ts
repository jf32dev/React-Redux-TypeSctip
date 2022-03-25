import * as React from 'react';
import {
  CalculatorFormState,
  CalculatorFormKnownActions,
} from '../../../store/form/type';
import { PreviousValuesState, SelectOptionsState } from './type';

/** Dispatch is being added to the context after initialisation */
const DISPATCH_PLACEHOLDER = () => null;

export const tradeUpCalculatorState: CalculatorFormState<
  SelectOptionsState,
  PreviousValuesState
> = {
  selectOptions: {
    type: [],
  },
  previousValues: {
    type: null,
  },
};

export type TradeUpContextForm = {
  state: CalculatorFormState<SelectOptionsState, PreviousValuesState>;
  dispatch: React.Dispatch<CalculatorFormKnownActions>;
};

export const TradeUpCalculatorContext = React.createContext<TradeUpContextForm>(
  {
    state: tradeUpCalculatorState,
    dispatch: DISPATCH_PLACEHOLDER,
  }
);
