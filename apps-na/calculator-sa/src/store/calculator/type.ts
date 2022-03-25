import { Action } from 'redux';
import { CountryCode, CurrencyCode } from '@redbull/common';

export interface ICountry {
  countryName: string;
  country: CountryCode;
  id: number;
}
export interface CalculatorState {
  countries: ICountry[];
  selectedCountry: CountryCode | null;
  currencies: CurrencyCode[];
  selectedCurrency: CurrencyCode | null;
  loading: boolean;
  error?: any;
}

export const GET_CALCULATOR_COUNTRY_REQUEST = 'calculator/countryGroupRequest';
export const GET_CALCULATOR_COUNTRY_SUCCESS = 'calculator/countryGroupSuccess';
export const GET_CALCULATOR_COUNTRY_FAIL = 'calculator/countryGroupFail';
export const SET_AVAILABLE_CURRENCY = 'calculator/availableCurrency';
export const SET_SELECTED_CURRENCY = 'calculator/selectedCurrency';
export const SET_SELECTED_COUNTRY = 'calculator/setSelectedCountry';
export const SET_COUNTRY_CURRENCY = 'calculator/setCountryCurrency';

interface GetCalculatorCountryRequestAction {
  type: typeof GET_CALCULATOR_COUNTRY_REQUEST;
}

interface GetCalculatorCountrySuccessAction
  extends Action<typeof GET_CALCULATOR_COUNTRY_SUCCESS> {
  payload: ICountry[];
}

interface GetCalculatorCountryFailAction
  extends Action<typeof GET_CALCULATOR_COUNTRY_FAIL> {
  error: any;
}

interface SetAvailableCurrencyAction
  extends Action<typeof SET_AVAILABLE_CURRENCY> {
  payload: CurrencyCode[];
}

interface SetSelectedCurrencyAction
  extends Action<typeof SET_SELECTED_CURRENCY> {
  payload: CurrencyCode | null;
}

interface SetSelectedCountryAction extends Action<typeof SET_SELECTED_COUNTRY> {
  payload: CountryCode;
}

interface SetCountryCurrencyAction extends Action<typeof SET_COUNTRY_CURRENCY> {
  payload: {
    country: CountryCode;
    currency: CurrencyCode;
  };
}

export type CalculatorKnownActionTypes =
  | GetCalculatorCountryRequestAction
  | GetCalculatorCountrySuccessAction
  | GetCalculatorCountryFailAction
  | SetAvailableCurrencyAction
  | SetSelectedCurrencyAction
  | SetSelectedCountryAction
  | SetCountryCurrencyAction;
