import { AppThunkAction } from '../index';
import {
  CalculatorActionTypes,
  GET_CALCULATOR_LIST_REQUEST,
  GET_CALCULATOR_LIST_FAIL,
  GET_CALCULATOR_LIST_SUCCESS,
} from './type';
import calculatorService from '../../api/services/calculator';

export const getCalculatorList = (
  limit: number = 20
): AppThunkAction<CalculatorActionTypes> => async (dispatch, getState) => {
  dispatch({
    type: GET_CALCULATOR_LIST_REQUEST,
  });

  const availableCalculator = await calculatorService.getAvailableCalculatorList(
    limit,
    getState().calculator.list.data.length
  );
  if (availableCalculator.value) {
    const { data } = availableCalculator.value.data;
    dispatch({
      type: GET_CALCULATOR_LIST_SUCCESS,
      payload: {
        data,
        hasMore: data.length === limit,
      },
    });
    return;
  }
  dispatch({
    type: GET_CALCULATOR_LIST_FAIL,
    error: availableCalculator.error?.message,
  });
};
