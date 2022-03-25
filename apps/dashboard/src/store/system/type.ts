import { Action } from 'redux';
import { SystemConfig, User } from '@redbull/services';

export interface SystemState {
  appName: string;
  appVersion: string;
  locale: string;
  loginUserId: number;
  loginUser: User;
  loading: boolean;
  error?: any;
}

export const GET_SYSTEM_REQUEST = 'config/getConfigRequest';
export const GET_SYSTEM_SUCCESS = 'config/getConfigSuccess';
export const GET_SYSTEM_FAIL = 'config/getConfigFail';

export const GET_LOGINUSER_DETAIL_REQUEST = 'config/getLoginUserDetailRequest';
export const GET_LOGINUSER_DETAIL_SUCCESS = 'config/getLoginUserDetailSuccess';
export const GET_LOGINUSER_DETAIL_FAIL = 'config/getLoginUserDetailFail';

interface GetSystemRequestAction {
  type: typeof GET_SYSTEM_REQUEST;
}
interface GetSystemRequestSuccessAction
  extends Action<typeof GET_SYSTEM_SUCCESS> {
  payload: SystemConfig;
}

interface GetSystemRequestFailAction {
  type: typeof GET_SYSTEM_FAIL;
  payload: any;
}

interface GetLoginUserDetailRequestAction {
  type: typeof GET_LOGINUSER_DETAIL_REQUEST;
}
interface GetLoginUserDetailSuccessAction
  extends Action<typeof GET_LOGINUSER_DETAIL_SUCCESS> {
  payload: User;
}

interface GetLoginUserDetailFailAction
  extends Action<typeof GET_LOGINUSER_DETAIL_FAIL> {
  payload: any;
}

export type SystemActionTypes =
  | GetSystemRequestAction
  | GetSystemRequestSuccessAction
  | GetSystemRequestFailAction
  | GetLoginUserDetailRequestAction
  | GetLoginUserDetailSuccessAction
  | GetLoginUserDetailFailAction;
