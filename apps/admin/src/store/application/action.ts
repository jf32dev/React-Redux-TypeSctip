import { push, RouterAction } from 'connected-react-router';
import { AppThunkAction } from '../index';
import {
  ApplicationActionTypes,
  GET_APPLICATION_LIST_REQUEST,
  GET_APPLICATION_LIST_FAIL,
  GET_APPLICATION_LIST_SUCCESS,
  GET_APPLICATION_DATA_REQUEST,
  GET_APPLICATION_DATA_FAIL,
  GET_APPLICATION_DATA_SUCCESS,
  UPDATE_APPLICATION_STATUS_REQUEST,
  UPDATE_APPLICATION_STATUS_FAIL,
  UPDATE_APPLICATION_STATUS_SUCCESS,
  GET_USER_GROUPS_REQUEST,
  GET_USER_GROUPS_FAIL,
  GET_USER_GROUPS_SUCCESS,
  CLEAR_APPLICATION_DATA,
  CLEAR_APPLICATION_LIST,
} from './type';
import {
  EApplicationAction,
  EApplicationFilter,
  EApplicationStatus,
  IUpdateApplicationStatus,
} from '../../api/services/application/type';
import applicationService from '../../api/services/application';

export const getApplicationList = (
  limit: number = 20,
  status?: EApplicationFilter
): AppThunkAction<ApplicationActionTypes> => async (dispatch, getState) => {
  dispatch({
    type: GET_APPLICATION_LIST_REQUEST,
  });

  const listLength = getState().application.list.data.length;

  const applications = await applicationService.getApplicationList(
    listLength,
    limit,
    status
  );

  if (applications.value) {
    const { data } = applications.value.data;
    dispatch({
      type: GET_APPLICATION_LIST_SUCCESS,
      payload: {
        data,
        hasMore: data.length === limit,
      },
    });
    return;
  }
  dispatch({
    type: GET_APPLICATION_LIST_FAIL,
    error: applications.error?.message,
  });
};

export const getApplicationData = (
  appId: string
): AppThunkAction<ApplicationActionTypes> => async (dispatch) => {
  dispatch({
    type: GET_APPLICATION_DATA_REQUEST,
  });

  const application = await applicationService.getApplicationById(appId);

  if (application.value) {
    dispatch({
      type: GET_APPLICATION_DATA_SUCCESS,
      payload: application.value.data,
    });
    return;
  }
  dispatch({
    type: GET_APPLICATION_DATA_FAIL,
    error: application.error?.message,
  });
};

export const updateApplicationStatus = (
  appId: string,
  appData: IUpdateApplicationStatus
): AppThunkAction<ApplicationActionTypes | RouterAction> => async (
  dispatch,
  getState
) => {
  dispatch({
    type: UPDATE_APPLICATION_STATUS_REQUEST,
    payload: appId,
  });

  const appResponse = await applicationService.updateApplicationStatus(
    appId,
    appData
  );

  if (appResponse.value) {
    const applicationList = getState().application.list.data;
    const updatedAppList = applicationList.map((app) => {
      if (app.id === appId) {
        return {
          ...app,
          result:
            appData.action === EApplicationAction.APPROVE
              ? EApplicationStatus.APPROVED
              : EApplicationStatus.DECLINED,
        };
      }
      return app;
    });

    dispatch({
      type: UPDATE_APPLICATION_STATUS_SUCCESS,
      payload: updatedAppList,
    });
    dispatch(push('/self-registration'));
    return;
  }

  dispatch({
    type: UPDATE_APPLICATION_STATUS_FAIL,
    error: appResponse.error?.message,
  });
};

export const getUserGroups = (): AppThunkAction<
  ApplicationActionTypes
> => async (dispatch) => {
  dispatch({
    type: GET_USER_GROUPS_REQUEST,
  });

  const groups = await applicationService.getGroups();

  if (groups.value) {
    dispatch({
      type: GET_USER_GROUPS_SUCCESS,
      payload: groups.value.data.data,
    });
    return;
  }

  dispatch({
    type: GET_USER_GROUPS_FAIL,
    error: groups.error?.message,
  });
};

export const clearApplicationData = () => ({
  type: CLEAR_APPLICATION_DATA,
});

export const clearApplicationList = () => ({
  type: CLEAR_APPLICATION_LIST,
});
