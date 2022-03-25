import { User } from '@redbull/services';
import {
  SystemState,
  SystemActionTypes,
  GET_SYSTEM_SUCCESS,
  GET_SYSTEM_REQUEST,
  GET_SYSTEM_FAIL,
  GET_LOGINUSER_DETAIL_REQUEST,
  GET_LOGINUSER_DETAIL_SUCCESS,
  GET_LOGINUSER_DETAIL_FAIL,
} from './type';

const initialState: SystemState = {
  appName: '',
  appVersion: '',
  locale: '',
  loginUserId: 0,
  loginUser: {} as User,
  loading: false,
};

const systemReducer = (
  state: SystemState = initialState,
  action: SystemActionTypes
): SystemState => {
  switch (action.type) {
    case GET_SYSTEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SYSTEM_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const {
        appName,
        appVersion,
        userId: loginUserId,
        locale,
      } = action.payload;
      return {
        ...state,
        appName,
        appVersion,
        locale,
        loginUserId,
        loading: false,
      };
    case GET_SYSTEM_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_LOGINUSER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LOGINUSER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        loginUser: action.payload,
      };
    case GET_LOGINUSER_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default systemReducer;
