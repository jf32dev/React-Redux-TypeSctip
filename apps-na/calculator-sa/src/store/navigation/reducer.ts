import {
  NavigationState,
  NavigationActionTypes,
  GET_CHANNEL_NAVIGATION_REQUEST,
  GET_CHANNEL_NAVIGATION_SUCCESS,
  GET_CHANNEL_NAVIGATION_FAIL,
  GET_STORY_NAVIGATION_REQUEST,
  GET_STORY_NAVIGATION_SUCCESS,
  GET_STORY_NAVIGATION_FAIL,
  SET_PRESELECTED,
  CLEAR_PRESELECTED,
} from './type';

const initialState: NavigationState = {
  channels: {
    nav: {},
    loading: false,
  },
  stories: {
    nav: {},
    loading: false,
  },
  preselected: null,
};

const navigationReducer = (
  state: NavigationState = initialState,
  action: NavigationActionTypes
): NavigationState => {
  switch (action.type) {
    case GET_CHANNEL_NAVIGATION_REQUEST:
      return {
        ...state,
        channels: {
          ...state.channels,
          loading: true,
        },
      };
    case GET_CHANNEL_NAVIGATION_SUCCESS:
      return {
        ...state,
        channels: {
          ...state.channels,
          loading: false,
          nav: {
            ...state.channels.nav,
            [action.payload.parent]: action.payload.list,
          },
        },
      };
    case GET_CHANNEL_NAVIGATION_FAIL:
      return {
        ...state,
        channels: {
          ...state.channels,
          loading: false,
          error: action.payload,
        },
      };
    case GET_STORY_NAVIGATION_REQUEST:
      return {
        ...state,
        stories: {
          ...state.stories,
          loading: true,
        },
      };
    case GET_STORY_NAVIGATION_SUCCESS:
      return {
        ...state,
        stories: {
          ...state.stories,
          loading: false,
          nav: {
            ...state.stories.nav,
            [action.payload.parent]: action.payload.list,
          },
        },
      };
    case GET_STORY_NAVIGATION_FAIL:
      return {
        ...state,
        stories: {
          ...state.stories,
          loading: false,
          error: action.payload,
        },
      };
    case SET_PRESELECTED:
      return {
        ...state,
        preselected: action.payload,
      };
    case CLEAR_PRESELECTED:
      return {
        ...state,
        preselected: null,
      };
    default:
      return state;
  }
};

export default navigationReducer;
