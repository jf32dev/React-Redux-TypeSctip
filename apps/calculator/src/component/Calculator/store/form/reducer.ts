import {
  SET_SELECT_OPTIONS,
  CalculatorFormState,
  CalculatorFormKnownActions,
} from './type';

export const selectReducer = (
  state: CalculatorFormState,
  action: CalculatorFormKnownActions
) => {
  switch (action.type) {
    case SET_SELECT_OPTIONS:
      return {
        ...state,
        selectOptions: {
          ...state.selectOptions,
          [action.payload.name]: action.payload.options,
        },
      };
    default:
      return state;
  }
};
