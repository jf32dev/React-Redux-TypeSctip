import { Action } from 'redux';
import { TStatus } from '../sharedType';

export interface AuthState {
  status: TStatus;
  error?: string;
}

export const AUTHENTICATE_REQUEST = 'auth/request';
export const AUTHENTICATE_SUCCESS = 'auth/succeded';
export const AUTHENTICATE_FAIL = 'auth/fail';

interface AuthenticateRequestAction
  extends Action<typeof AUTHENTICATE_REQUEST> {}

interface AuthenticateSuccessAction
  extends Action<typeof AUTHENTICATE_SUCCESS> {}

interface AutheticateFailAction extends Action<typeof AUTHENTICATE_FAIL> {
  error?: string;
}

export type AuthActionTypes =
  | AuthenticateRequestAction
  | AuthenticateSuccessAction
  | AutheticateFailAction;
