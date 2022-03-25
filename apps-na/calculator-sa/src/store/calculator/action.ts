import { EEntityType, Channel } from '@redbull/services';
import {
  hasCountryCode,
  getCountryName,
  CountryCode,
  CurrencyCode,
} from '@redbull/common';
import { AppThunkAction } from '..';
import {
  GET_CALCULATOR_COUNTRY_REQUEST,
  CalculatorKnownActionTypes,
  GET_CALCULATOR_COUNTRY_FAIL,
  GET_CALCULATOR_COUNTRY_SUCCESS,
  SET_AVAILABLE_CURRENCY,
  SET_SELECTED_CURRENCY,
  SET_SELECTED_COUNTRY,
  SET_COUNTRY_CURRENCY,
} from './type';
import calculatorTab from '../../constants/calculator';
import bridgeServices from '../../api/service';

export const getCalculatorCountries = (): AppThunkAction<
  CalculatorKnownActionTypes
> => async (dispatch) => {
  dispatch({ type: GET_CALCULATOR_COUNTRY_REQUEST });

  const channels = await bridgeServices.getList<Channel>({
    entityName: EEntityType.CHANNEL,
    parentEntityName: EEntityType.TAB,
    peid: calculatorTab,
  });
  if (channels.hasError) {
    dispatch({
      type: GET_CALCULATOR_COUNTRY_FAIL,
      error: JSON.stringify(channels.error),
    });
    return;
  }

  const countries = channels.value
    .filter((c) => hasCountryCode(c.name as CountryCode))
    .map((c) => ({
      countryName: getCountryName(c.name as CountryCode) || '',
      country: c.name as CountryCode,
      id: c.id,
    }));

  dispatch(setSelectedCountry(countries[0].country));
  dispatch({
    type: GET_CALCULATOR_COUNTRY_SUCCESS,
    payload: countries,
  });
};

export const setAvailableCurrency = (currency: CurrencyCode[]) => ({
  type: SET_AVAILABLE_CURRENCY,
  payload: currency,
});

export const setSelectedCurrency = (currency: CurrencyCode | null) => ({
  type: SET_SELECTED_CURRENCY,
  payload: currency,
});

export const setSelectedCountry = (
  country: CountryCode
): CalculatorKnownActionTypes => ({
  type: SET_SELECTED_COUNTRY,
  payload: country,
});

export const setCountryCurrency = (
  country: CountryCode,
  currency: CurrencyCode
) => ({
  type: SET_COUNTRY_CURRENCY,
  payload: {
    country,
    currency,
  },
});
