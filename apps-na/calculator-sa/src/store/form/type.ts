import { SelectOption } from '../../shared/type';

export const SET_SELECT_OPTIONS = 'calculator/setSelectOptions';

export interface CalculatorFormState<S = any, P = any> {
  selectOptions: S;
  previousValues: P;
}

export interface SetSelectOptionsAction {
  type: typeof SET_SELECT_OPTIONS;
  payload: {
    name: string;
    options: SelectOption[];
  };
}

export type CalculatorFormKnownActions = SetSelectOptionsAction;
