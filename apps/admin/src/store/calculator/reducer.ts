import {
  CalculatorState,
  CalculatorActionTypes,
  GET_CALCULATOR_LIST_SUCCESS,
  GET_CALCULATOR_LIST_REQUEST,
  GET_CALCULATOR_LIST_FAIL,
} from './type';

const initialState: CalculatorState = {
  list: {
    status: 'idle',
    data: [],
    hasMore: true,
    error: null,
  },
};

const reducer = (
  state: CalculatorState = initialState,
  action: CalculatorActionTypes
): CalculatorState => {
  switch (action.type) {
    case GET_CALCULATOR_LIST_REQUEST:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'loading',
        },
      };
    case GET_CALCULATOR_LIST_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: [...state.list.data, ...action.payload.data],
          hasMore: action.payload.hasMore,
          status: 'succeeded',
        },
      };
    case GET_CALCULATOR_LIST_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error,
          status: 'failed',
          hasMore: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
