import {
  BookmarkState,
  BookmarkActionTypes,
  GET_BOOKMARK_REQUEST,
  GET_BOOKMARK_SUCCESS,
  GET_BOOKMARK_FAIL,
} from './type';

const initialState: BookmarkState = {
  file: {
    data: [],
    hasMore: true,
  },
  story: {
    data: [],
    hasMore: true,
  },
  collection: [],
  loading: false,
};

const reducer = (
  state: BookmarkState = initialState,
  action: BookmarkActionTypes
): BookmarkState => {
  switch (action.type) {
    case GET_BOOKMARK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BOOKMARK_SUCCESS: {
      const { file, story, collection } = action.payload;
      return {
        ...state,
        file,
        story,
        collection,
        loading: false,
      };
    }
    case GET_BOOKMARK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
