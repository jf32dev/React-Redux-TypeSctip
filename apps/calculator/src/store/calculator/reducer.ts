import {
  CalculatorState,
  CalculatorKnownActionTypes,
  GET_CALCULATOR_COUNTRY_REQUEST,
  GET_CALCULATOR_COUNTRY_SUCCESS,
  GET_CALCULATOR_COUNTRY_FAIL,
  SET_SELECTED_COUNTRY,
  SET_SELECTED_CURRENCY,
  SET_AVAILABLE_CURRENCY,
  SET_COUNTRY_CURRENCY,
} from './type';

const initialState: CalculatorState = {
  countries: [],
  selectedCountry: null,
  currencies: [],
  selectedCurrency: null,
  loading: false,
};

const reducer = (
  state: CalculatorState = initialState,
  action: CalculatorKnownActionTypes
) => {
  switch (action.type) {
    case GET_CALCULATOR_COUNTRY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CALCULATOR_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        countries: action.payload,
      };
    case GET_CALCULATOR_COUNTRY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_SELECTED_COUNTRY:
      return {
        ...state,
        selectedCountry: action.payload,
      };
    case SET_SELECTED_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.payload,
      };
    case SET_AVAILABLE_CURRENCY:
      return {
        ...state,
        currencies: action.payload,
      };
    case SET_COUNTRY_CURRENCY:
      return {
        ...state,
        selectedCountry: action.payload.country,
        selectedCurrency: action.payload.currency,
      };
    default:
      return state;
  }
};

export default reducer;
