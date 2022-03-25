import { AppThunkAction } from '..';
import accountService from '../../api/services/account';
import {
  AccountActionTypes,
  GET_PERSONAL_DETAIL_FAIL,
  GET_PERSONAL_DETAIL_REQUEST,
  GET_PERSONAL_DETAIL_SUCCESS,
} from './type';

export const getMyDetail = (): AppThunkAction<AccountActionTypes> => async (
  dispatch
) => {
  dispatch({
    type: GET_PERSONAL_DETAIL_REQUEST,
  });
  const personal = await accountService.getMyProfile();

  if (personal.value && !personal.hasError) {
    dispatch({
      type: GET_PERSONAL_DETAIL_SUCCESS,
      payload: personal.value.data,
    });
    return;
  }

  dispatch({
    type: GET_PERSONAL_DETAIL_FAIL,
    error: personal.error?.message,
  });
};
