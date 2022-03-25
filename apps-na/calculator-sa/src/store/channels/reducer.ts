import {
  ChannelState,
  ChannelActionTypes,
  GET_CHANNEL_LIST_REQUEST,
  GET_CHANNEL_LIST_SUCCESS,
  GET_CHANNEL_LIST_FAIL,
  CLEAR_CHANNEL_LIST,
  GET_PERSONAL_CHANNEL_ID_SUCCESS,
  GET_PERSONAL_CHANNEL_ID_REQUEST,
  GET_PERSONAL_CHANNEL_ID_FAIL,
} from './type';

const initialState: ChannelState = {
  list: [],
  personalChannelId: null,
  loading: false,
};

const reducer = (
  state: ChannelState = initialState,
  action: ChannelActionTypes
): ChannelState => {
  switch (action.type) {
    case GET_CHANNEL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CHANNEL_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case GET_CHANNEL_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_PERSONAL_CHANNEL_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PERSONAL_CHANNEL_ID_SUCCESS:
      return {
        ...state,
        personalChannelId: action.payload,
        loading: false,
      };
    case GET_PERSONAL_CHANNEL_ID_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_CHANNEL_LIST:
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
};

export default reducer;
