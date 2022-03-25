import { User, EEntityType } from '@redbull/services';
import { AppThunkAction } from '..';
import bridgeServices from '../../api/service';
import {
  SystemActionTypes,
  GET_SYSTEM_REQUEST,
  GET_SYSTEM_FAIL,
  GET_SYSTEM_SUCCESS,
  GET_LOGINUSER_DETAIL_FAIL,
  GET_LOGINUSER_DETAIL_SUCCESS,
  GET_LOGINUSER_DETAIL_REQUEST,
} from './type';

export const getSystemConfig = (): AppThunkAction<SystemActionTypes> => async (
  dispatch
) => {
  dispatch({
    type: GET_SYSTEM_REQUEST,
  });
  const systemConfig = await bridgeServices.getSystemConfig();
  if (!systemConfig.hasError) {
    // get Login User Detail
    dispatch({
      type: GET_LOGINUSER_DETAIL_REQUEST,
    });
    const user = await bridgeServices.getEntity<User>({
      entityName: EEntityType.USER,
      id: systemConfig.value.userId,
    });
    if (user.hasError) {
      dispatch({
        type: GET_LOGINUSER_DETAIL_FAIL,
        payload: user.error,
      });
    } else {
      dispatch({
        type: GET_LOGINUSER_DETAIL_SUCCESS,
        payload: user.value,
      });
    }

    dispatch({
      type: GET_SYSTEM_SUCCESS,
      payload: systemConfig.value,
    });
  } else {
    dispatch({
      type: GET_SYSTEM_FAIL,
      payload: systemConfig.value,
    });
  }
};
