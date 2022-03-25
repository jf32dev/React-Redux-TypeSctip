import {
  TabState,
  TabActionTypes,
  GET_PERSONAL_TAB_ID_REQUEST,
  GET_PERSONAL_TAB_ID_SUCCESS,
  GET_PERSONAL_TAB_ID_FAIL,
} from './type';

const initialState: TabState = {
  personalTab: null,
  loading: false,
};

const reducer = (
  state: TabState = initialState,
  action: TabActionTypes
): TabState => {
  switch (action.type) {
    case GET_PERSONAL_TAB_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PERSONAL_TAB_ID_SUCCESS:
      return {
        ...state,
        personalTab: action.payload,
        loading: false,
      };
    case GET_PERSONAL_TAB_ID_FAIL:
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
