import { Action } from 'redux';
import { Channel } from '@redbull/services';

export interface ChannelState {
  list: Channel[];
  personalChannelId: number | null;
  loading: boolean;
  error?: any;
}

export const GET_CHANNEL_LIST_REQUEST = 'channel/getChannelListRequest';
export const GET_CHANNEL_LIST_SUCCESS = 'channel/getChannelListSuccess';
export const GET_CHANNEL_LIST_FAIL = 'channel/getChannelListFail';

export const GET_PERSONAL_CHANNEL_ID_REQUEST =
  'channel/getPersonalChannelIdRequest';
export const GET_PERSONAL_CHANNEL_ID_SUCCESS =
  'channel/getPersonalChannelIdSuccess';
export const GET_PERSONAL_CHANNEL_ID_FAIL = 'channel/getPersonalChannelIdFail';

export const CLEAR_CHANNEL_LIST = 'channel/clearChannelList';

interface GetPersonalChannelIdRequestAction {
  type: typeof GET_PERSONAL_CHANNEL_ID_REQUEST;
}

interface GetPersonalChannelIdSuccessAction
  extends Action<typeof GET_PERSONAL_CHANNEL_ID_SUCCESS> {
  payload: number;
}

interface GetPersonalChannelIdFailAction
  extends Action<typeof GET_PERSONAL_CHANNEL_ID_FAIL> {
  payload: any;
}
interface GetChannelListRequestAction {
  type: typeof GET_CHANNEL_LIST_REQUEST;
}
interface GetChannelListSuccessAction
  extends Action<typeof GET_CHANNEL_LIST_SUCCESS> {
  payload: Channel[];
}

interface GetChannelListFailAction
  extends Action<typeof GET_CHANNEL_LIST_FAIL> {
  payload: any;
}

interface ClearChannelListAction {
  type: typeof CLEAR_CHANNEL_LIST;
}

export type ChannelActionTypes =
  | GetChannelListRequestAction
  | GetChannelListSuccessAction
  | GetChannelListFailAction
  | GetPersonalChannelIdRequestAction
  | GetPersonalChannelIdSuccessAction
  | GetPersonalChannelIdFailAction
  | ClearChannelListAction;
