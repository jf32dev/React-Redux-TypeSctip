import { push, RouterAction } from 'connected-react-router';
import { AppThunkAction } from '..';
import { authorize, challenge } from '../../api/services/auth/utils';
import authService from '../../api/services/auth';
import { AuthLogin } from '../../api/services/auth/type';
import {
  AuthActionTypes,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
} from './type';

export const authenticate = (
  auth: AuthLogin
): AppThunkAction<AuthActionTypes | RouterAction, Promise<void>> => async (
  dispatch
) => {
  dispatch({
    type: AUTHENTICATE_REQUEST,
  });
  const validated = challenge(auth.state);
  if (!validated) {
    dispatch({
      type: AUTHENTICATE_FAIL,
    });
    return;
  }
  const jwt = await authService.authenticateJWT(auth.code);

  if (jwt.value?.data) {
    authorize(jwt.value?.data);
    dispatch({
      type: AUTHENTICATE_SUCCESS,
    });
    dispatch(push(validated));
  }
};
