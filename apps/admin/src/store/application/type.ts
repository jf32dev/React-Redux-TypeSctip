import { Action } from 'redux';
import { IApplication, IUserGroup } from '../../api/services/application/type';
import { TStatus } from '../sharedType';

export interface ApplicationState {
  list: {
    status: TStatus;
    data: IApplication[];
    error?: string | null;
    hasMore: boolean;
  };
  application: {
    status: TStatus;
    data: IApplication | null;
    error?: string | null;
  };
  userGroups: {
    status: TStatus;
    data: IUserGroup[];
    error?: string | null;
  };
  isUpdating: string | null;
  updatingError?: string | null;
}

export const GET_APPLICATION_LIST_REQUEST =
  'application/getApplicationListRequest';
export const GET_APPLICATION_LIST_SUCCESS =
  'application/getApplicationListSuccess';
export const GET_APPLICATION_LIST_FAIL = 'application/getApplicationListFail';

export const CLEAR_APPLICATION_LIST = 'application/clearApplicationList';

export const GET_APPLICATION_DATA_REQUEST =
  'application/getApplicationDataRequest';
export const GET_APPLICATION_DATA_SUCCESS =
  'application/getApplicationDataSuccess';
export const GET_APPLICATION_DATA_FAIL = 'application/getApplicationDataFail';

export const CLEAR_APPLICATION_DATA = 'application/clearApplicationData';

export const UPDATE_APPLICATION_STATUS_REQUEST =
  'application/updateApplicationStatusRequest';
export const UPDATE_APPLICATION_STATUS_SUCCESS =
  'application/updateApplicationStatusSuccess';
export const UPDATE_APPLICATION_STATUS_FAIL =
  'application/updateApplicationStatusFail';

export const GET_USER_GROUPS_REQUEST = 'application/getUserGroupsRequest';
export const GET_USER_GROUPS_SUCCESS = 'application/getUserGroupsSuccess';
export const GET_USER_GROUPS_FAIL = 'application/getUserGroupsFail';

interface GetApplicationListRequestAction
  extends Action<typeof GET_APPLICATION_LIST_REQUEST> {}

interface GetApplicationListRequestSuccessAction
  extends Action<typeof GET_APPLICATION_LIST_SUCCESS> {
  payload: {
    data: IApplication[];
    hasMore: boolean;
  };
}
interface GetApplicationListRequestFailAction
  extends Action<typeof GET_APPLICATION_LIST_FAIL> {
  error?: string;
}

interface GetApplicationDataRequestAction
  extends Action<typeof GET_APPLICATION_DATA_REQUEST> {}

interface GetApplicationDataSuccessAction
  extends Action<typeof GET_APPLICATION_DATA_SUCCESS> {
  payload: IApplication;
}
interface GetApplicationDataRequestFailAction
  extends Action<typeof GET_APPLICATION_DATA_FAIL> {
  error?: string;
}

interface UpdateApplicationStatusRequestAction
  extends Action<typeof UPDATE_APPLICATION_STATUS_REQUEST> {
  payload: string;
}

interface UpdateApplicationStatusRequestSuccessAction
  extends Action<typeof UPDATE_APPLICATION_STATUS_SUCCESS> {
  payload: IApplication[];
}
interface UpdateApplicationStatusRequestFailAction
  extends Action<typeof UPDATE_APPLICATION_STATUS_FAIL> {
  error?: string;
}

interface GetUserGroupsRequestAction
  extends Action<typeof GET_USER_GROUPS_REQUEST> {}

interface GetUserGroupsRequestSuccessAction
  extends Action<typeof GET_USER_GROUPS_SUCCESS> {
  payload: IUserGroup[];
}
interface GetUserGroupsRequestFailAction
  extends Action<typeof GET_USER_GROUPS_FAIL> {
  error?: string;
}

interface ClearApplicationListAction
  extends Action<typeof CLEAR_APPLICATION_LIST> {}

interface ClearApplicationDataAction
  extends Action<typeof CLEAR_APPLICATION_DATA> {}

export type ApplicationActionTypes =
  | GetApplicationListRequestAction
  | GetApplicationListRequestSuccessAction
  | GetApplicationListRequestFailAction
  | ClearApplicationListAction
  | GetApplicationDataRequestAction
  | GetApplicationDataSuccessAction
  | GetApplicationDataRequestFailAction
  | UpdateApplicationStatusRequestAction
  | UpdateApplicationStatusRequestSuccessAction
  | UpdateApplicationStatusRequestFailAction
  | ClearApplicationDataAction
  | GetUserGroupsRequestAction
  | GetUserGroupsRequestSuccessAction
  | GetUserGroupsRequestFailAction;
