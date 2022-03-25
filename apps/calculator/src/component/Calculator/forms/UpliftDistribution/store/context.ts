import React from 'react';
import {
  CalculatorFormState,
  CalculatorFormKnownActions,
} from '../../../store/form/type';
import { PreviousValuesState, SelectOptionsState } from './type';
import { createCalculatorContext } from '../../../store/form/context';

/** Dispatch is being added to the context after initialisation */
const DISPATCH_PLACEHOLDER = () => null;

export const upliftCalculatorState: CalculatorFormState<
  SelectOptionsState,
  PreviousValuesState
> = {
  selectOptions: {
    type: [],
    variant: [],
    size: [],
    pack: [],
  },
  previousValues: {
    type: null,
    variant: null,
    size: null,
    pack: null,
  },
};

export type UpliftContextProps = {
  state: CalculatorFormState<SelectOptionsState, PreviousValuesState>;
  dispatch: React.Dispatch<CalculatorFormKnownActions>;
};
export const UpliftCalculatorContext = createCalculatorContext<
  UpliftContextProps
>({
  state: upliftCalculatorState,
  dispatch: DISPATCH_PLACEHOLDER,
});
