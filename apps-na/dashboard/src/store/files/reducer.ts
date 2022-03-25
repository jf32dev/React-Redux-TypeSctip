import {
  FileState,
  FileActionTypes,
  GET_THUMBNAIL_LIST_REQUEST,
  GET_THUMBNAIL_LIST_SUCCESS,
  GET_THUMBNAIL_LIST_FAIL,
} from './type';

const initialState: FileState = {
  thumbnail: [],
  languageMap: {},
  loading: false,
};

const reducer = (
  state: FileState = initialState,
  action: FileActionTypes
): FileState => {
  switch (action.type) {
    case GET_THUMBNAIL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_THUMBNAIL_LIST_SUCCESS:
      return {
        ...state,
        thumbnail: action.payload.thumbnails,
        languageMap: action.payload.languageMap,
        loading: false,
      };
    case GET_THUMBNAIL_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
