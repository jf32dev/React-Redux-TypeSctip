import * as React from 'react';
import {
  CalculatorFormState,
  CalculatorFormKnownActions,
} from '../../../store/form/type';
import { SelectOptionsState, PreviousValuesState } from './type';

/** Dispatch is being added to the context after initialisation */
const DISPATCH_PLACEHOLDER = () => null;

export const upliftSalesCalculatorState: CalculatorFormState<
  SelectOptionsState,
  PreviousValuesState
> = {
  selectOptions: {
    type: [],
    salesDriver: [],
  },
  previousValues: {
    type: null,
    salesDriver: null,
  },
};

export type UpliftSalesContextProps = {
  state: CalculatorFormState<SelectOptionsState, PreviousValuesState>;
  dispatch: React.Dispatch<CalculatorFormKnownActions>;
};

export const UpliftSalesContext = React.createContext<UpliftSalesContextProps>({
  state: upliftSalesCalculatorState,
  dispatch: DISPATCH_PLACEHOLDER,
});
