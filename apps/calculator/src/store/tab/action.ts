import { AppThunkAction } from '../index';
import {
  TabActionTypes,
  GET_PERSONAL_TAB_ID_REQUEST,
  GET_PERSONAL_TAB_ID_FAIL,
  GET_PERSONAL_TAB_ID_SUCCESS,
} from './type';

import { getPrivateTab } from '../utils';

export const getPersonalTab = (): AppThunkAction<TabActionTypes> => async (
  dispatch
) => {
  dispatch({
    type: GET_PERSONAL_TAB_ID_REQUEST,
  });
  // Get Private Tab (Tab with isPersonal === true)
  const privateTab = await getPrivateTab();
  if (!privateTab) {
    dispatch({
      type: GET_PERSONAL_TAB_ID_FAIL,
      payload: 'Fail to get personal Tab',
    });
    return;
  }
  dispatch({
    type: GET_PERSONAL_TAB_ID_SUCCESS,
    payload: privateTab.id,
  });
};
