import {
  AccountActionTypes,
  AccountState,
  GET_PERSONAL_DETAIL_FAIL,
  GET_PERSONAL_DETAIL_REQUEST,
  GET_PERSONAL_DETAIL_SUCCESS,
} from './type';

const initialState: AccountState = {
  personalDetail: null,
  status: 'idle',
};

const accountReducer = (
  state: AccountState = initialState,
  action: AccountActionTypes
): AccountState => {
  switch (action.type) {
    case GET_PERSONAL_DETAIL_REQUEST:
      return { ...state, status: 'loading' };
    case GET_PERSONAL_DETAIL_SUCCESS:
      return { ...state, status: 'succeeded', personalDetail: action.payload };
    case GET_PERSONAL_DETAIL_FAIL:
      return { ...state, status: 'failed', error: action.error };
    default:
      return state;
  }
};

export default accountReducer;
