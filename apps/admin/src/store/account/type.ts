import { Action } from 'redux';
import { MyProfile } from '../../api/services/account/type';

export interface AccountState {
  personalDetail: MyProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

export const GET_PERSONAL_DETAIL_REQUEST = 'account/personalDetailRequest';
export const GET_PERSONAL_DETAIL_SUCCESS = 'account/personalDetailSuccess';
export const GET_PERSONAL_DETAIL_FAIL = 'account/personalDetailFail';

interface PersonalDetailRequestAction
  extends Action<typeof GET_PERSONAL_DETAIL_REQUEST> {}

interface PersonalDetailSuccessAction
  extends Action<typeof GET_PERSONAL_DETAIL_SUCCESS> {
  payload: MyProfile;
}

interface PersonalDetailFailAction
  extends Action<typeof GET_PERSONAL_DETAIL_FAIL> {
  error?: string;
}

export type AccountActionTypes =
  | PersonalDetailRequestAction
  | PersonalDetailSuccessAction
  | PersonalDetailFailAction;
