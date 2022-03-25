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
  SELECT_PREMISE,
} from './type';
import { getUserPremise } from './utils';

const initialState: SystemState = {
  appName: '',
  appVersion: '',
  locale: '',
  loginUserId: 0,
  loginUser: {} as User,
  loading: false,
  premise: {
    belongsTo: 'ONP',
    selected: 'ONP',
  },
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
    case GET_LOGINUSER_DETAIL_SUCCESS: {
      const premise = getUserPremise(action.payload.groups);
      return {
        ...state,
        loading: false,
        loginUser: action.payload,
        ...(premise !== 'none' && {
          premise: {
            belongsTo: premise,
            selected: premise !== 'both' ? premise : 'ONP',
          },
        }),
      };
    }
    case GET_LOGINUSER_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SELECT_PREMISE:
      return {
        ...state,
        premise: {
          ...state.premise,
          selected: action.payload,
        },
      };
    default:
      return state;
  }
};

export default systemReducer;
