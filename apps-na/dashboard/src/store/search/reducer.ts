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
  zunos: [],
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
        zunos: [],
      };
    case SEARCH_SUCCESS: {
      const { files, stories, zunos } = action.payload;
      return {
        ...state,
        files,
        stories,
        zunos,
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
