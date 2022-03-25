import {
  SearchActionTypes,
  SearchState,
  SEARCH_FAIL,
  SEARCH_REQUEST,
  SET_SEARCH_TERM,
  SEARCH_SUCCESS,
} from './type';

const initialState: SearchState = {
  term: '',
  files: [],
  stories: [],
  loading: false,
};

const reducer = (
  state: SearchState = initialState,
  action: SearchActionTypes
): SearchState => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        files: [],
        stories: [],
      };
    case SEARCH_SUCCESS: {
      const { files, stories } = action.payload;
      return {
        ...state,
        files,
        stories,
        loading: false,
      };
    }
    case SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        term: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
