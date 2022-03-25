import {
  StoryState,
  StoryActionTypes,
  GET_STORY_LIST_REQUEST,
  GET_STORY_LIST_SUCCESS,
  GET_STORY_LIST_FAIL,
  GET_STORY_BY_ID_REQUEST,
  GET_STORY_BY_ID_SUCCESS,
  GET_STORY_BY_ID_FAIL,
  CLEAR_STORY_LIST,
  CLEAR_STORY,
} from './type';

const initialState: StoryState = {
  listStory: {
    data: [],
    hasMore: true,
  },
  listFile: {
    data: [],
    hasMore: true,
  },
  list: [],
  story: null,
  loading: false,
  hasMore: true,
};

const reducer = (
  state: StoryState = initialState,
  action: StoryActionTypes
): StoryState => {
  switch (action.type) {
    case GET_STORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STORY_LIST_SUCCESS:
      return {
        ...state,
        listFile: action.payload.listFile || state.listFile,
        listStory: action.payload.listStory || state.listStory,
        list: action.payload.data,
        loading: false,
        hasMore: action.payload.hasMore,
      };
    case GET_STORY_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_STORY_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STORY_BY_ID_SUCCESS:
      return {
        ...state,
        story: action.payload,
        loading: false,
      };
    case GET_STORY_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_STORY_LIST:
      return {
        ...state,
        list: [],
      };
    case CLEAR_STORY:
      return {
        ...state,
        story: null,
      };
    default:
      return state;
  }
};

export default reducer;
