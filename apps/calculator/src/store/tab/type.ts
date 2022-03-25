import { Action } from 'redux';

export interface TabState {
  personalTab: number | null;
  loading: boolean;
  error?: any;
}

export const GET_PERSONAL_TAB_ID_REQUEST = 'channel/getPersonalTabIdRequest';
export const GET_PERSONAL_TAB_ID_SUCCESS = 'channel/getPersonalTabIdSuccess';
export const GET_PERSONAL_TAB_ID_FAIL = 'channel/getPersonalTabIdFail';

interface GetPersonalChannelIdRequestAction {
  type: typeof GET_PERSONAL_TAB_ID_REQUEST;
}

interface GetPersonalChannelIdSuccessAction
  extends Action<typeof GET_PERSONAL_TAB_ID_SUCCESS> {
  payload: number;
}

interface GetPersonalChannelIdFailAction
  extends Action<typeof GET_PERSONAL_TAB_ID_FAIL> {
  payload: any;
}

export type TabActionTypes =
  | GetPersonalChannelIdRequestAction
  | GetPersonalChannelIdSuccessAction
  | GetPersonalChannelIdFailAction;
