import { CalculatorFormKnownActions, SET_SELECT_OPTIONS } from './type';
import { SelectField } from '../../shared/type';

export const setSelectOptions = (
  select: SelectField
): CalculatorFormKnownActions => ({
  type: SET_SELECT_OPTIONS,
  payload: {
    name: select.name,
    options: select.options,
  },
});
