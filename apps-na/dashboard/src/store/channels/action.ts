import { EEntityType, Channel, GetListParams } from '@redbull/services';
import { AppThunkAction } from '../index';
import {
  ChannelActionTypes,
  GET_CHANNEL_LIST_REQUEST,
  GET_CHANNEL_LIST_SUCCESS,
  GET_CHANNEL_LIST_FAIL,
  CLEAR_CHANNEL_LIST,
  GET_PERSONAL_CHANNEL_ID_REQUEST,
  GET_PERSONAL_CHANNEL_ID_FAIL,
  GET_PERSONAL_CHANNEL_ID_SUCCESS,
} from './type';
import i18n from '../../i18n';

import { getMyChannel } from '../utils';
import bridgeServices from '../../api/service';

const LIMIT = 50;

export const getChannels = (
  params: Pick<GetListParams, Exclude<keyof GetListParams, 'entityName'>>
): AppThunkAction<ChannelActionTypes> => async (dispatch) => {
  dispatch({
    type: GET_CHANNEL_LIST_REQUEST,
  });

  const channels = await bridgeServices.getList<Channel>({
    entityName: EEntityType.CHANNEL,
    limit: LIMIT,
    ...params,
  });

  if (channels.hasError) {
    dispatch({
      type: GET_CHANNEL_LIST_FAIL,
      payload: JSON.stringify(channels.error),
    });
  }
  dispatch({
    type: GET_CHANNEL_LIST_SUCCESS,
    payload: channels.value,
  });
};

export const clearChannelList = () => ({
  type: CLEAR_CHANNEL_LIST,
});

export const getPersonalChannelId = (): AppThunkAction<
  ChannelActionTypes
> => async (dispatch, getState) => {
  dispatch({
    type: GET_PERSONAL_CHANNEL_ID_REQUEST,
  });
  // Get Private Tab (Tab with isPersonal === true)
  const privateTab = getState().tabs.personalTab;
  if (!privateTab) {
    dispatch({
      type: GET_PERSONAL_CHANNEL_ID_FAIL,
      payload: i18n.t('errorMessages.personalTabError'),
    });
    return;
  }
  const privateChannel = await getMyChannel(privateTab);
  if (!privateChannel) {
    dispatch({
      type: GET_PERSONAL_CHANNEL_ID_FAIL,
      payload: i18n.t('errorMessages.personalChannelError'),
    });
    return;
  }
  dispatch({
    type: GET_PERSONAL_CHANNEL_ID_SUCCESS,
    payload: privateChannel.id,
  });
};
