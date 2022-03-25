import {
  ApplicationState,
  ApplicationActionTypes,
  GET_APPLICATION_LIST_REQUEST,
  GET_APPLICATION_LIST_FAIL,
  GET_APPLICATION_LIST_SUCCESS,
  CLEAR_APPLICATION_LIST,
  GET_APPLICATION_DATA_REQUEST,
  GET_APPLICATION_DATA_FAIL,
  GET_APPLICATION_DATA_SUCCESS,
  CLEAR_APPLICATION_DATA,
  GET_USER_GROUPS_REQUEST,
  GET_USER_GROUPS_FAIL,
  GET_USER_GROUPS_SUCCESS,
  UPDATE_APPLICATION_STATUS_REQUEST,
  UPDATE_APPLICATION_STATUS_FAIL,
  UPDATE_APPLICATION_STATUS_SUCCESS,
} from './type';

const initialState: ApplicationState = {
  list: {
    status: 'idle',
    data: [],
    error: null,
    hasMore: true,
  },
  application: {
    status: 'idle',
    data: null,
    error: null,
  },
  userGroups: {
    status: 'idle',
    data: [],
    error: null,
  },
  isUpdating: null,
  updatingError: null,
};

const reducer = (
  state: ApplicationState = initialState,
  action: ApplicationActionTypes
): ApplicationState => {
  switch (action.type) {
    case GET_APPLICATION_LIST_REQUEST:
      return {
        ...state,
        list: {
          ...state.list,
          status: 'loading',
        },
      };
    case GET_APPLICATION_LIST_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: [...state.list.data, ...action.payload.data],
          hasMore: action.payload.hasMore,
          status: 'succeeded',
        },
      };
    case GET_APPLICATION_LIST_FAIL:
      return {
        ...state,
        list: {
          ...state.list,
          error: action.error,
          status: 'failed',
        },
      };
    case CLEAR_APPLICATION_LIST:
      return {
        ...state,
        list: {
          error: null,
          status: 'idle',
          data: [],
          hasMore: true,
        },
        updatingError: null,
      };
    case GET_APPLICATION_DATA_REQUEST:
      return {
        ...state,
        application: {
          ...state.application,
          status: 'loading',
        },
      };
    case GET_APPLICATION_DATA_SUCCESS:
      return {
        ...state,
        application: {
          ...state.application,
          data: action.payload,
          status: 'succeeded',
        },
      };
    case GET_APPLICATION_DATA_FAIL:
      return {
        ...state,
        application: {
          ...state.application,
          error: action.error,
          status: 'failed',
        },
      };
    case CLEAR_APPLICATION_DATA:
      return {
        ...state,
        application: {
          error: null,
          status: 'idle',
          data: null,
        },
        updatingError: null,
      };

    case GET_USER_GROUPS_REQUEST:
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          status: 'loading',
        },
      };
    case GET_USER_GROUPS_SUCCESS:
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          data: action.payload,
          status: 'succeeded',
        },
      };
    case GET_USER_GROUPS_FAIL:
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          error: action.error,
          status: 'failed',
        },
      };

    case UPDATE_APPLICATION_STATUS_REQUEST:
      return {
        ...state,
        isUpdating: action.payload,
      };
    case UPDATE_APPLICATION_STATUS_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.payload,
        },
        isUpdating: null,
        updatingError: null,
      };
    case UPDATE_APPLICATION_STATUS_FAIL:
      return {
        ...state,
        isUpdating: null,
        updatingError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
