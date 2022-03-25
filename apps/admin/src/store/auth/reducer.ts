import {
  AuthActionTypes,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AuthState,
} from './type';

const initialState: AuthState = {
  status: 'idle',
};
const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case AUTHENTICATE_REQUEST:
      return {
        ...state,
        status: 'loading',
      };
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
      };
    case AUTHENTICATE_FAIL:
      return {
        ...state,
        status: 'failed',
        error: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;
