import { User, EEntityType } from '@redbull/services';
import Result from '@redbull/services/shared/results';
import { AppThunkAction } from '..';
import bridgeServices from '../../api/service';
import {
  SystemActionTypes,
  GET_SYSTEM_REQUEST,
  GET_SYSTEM_FAIL,
  GET_SYSTEM_SUCCESS,
  GET_LOGINUSER_DETAIL_FAIL,
  GET_LOGINUSER_DETAIL_SUCCESS,
  GET_LOGINUSER_DETAIL_REQUEST,
  RedBullPremise,
  SELECT_PREMISE,
} from './type';
import { getUserPremise } from './utils';

/**
 * TODO: Remove this dummy stuff when the API is ready!
 */
const getFakeUserPoints = async (userId: number) => {
  console.log('generating fake user points for user -> ', userId);
  const value = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(2567);
    }, 300);
  });
  return new Result(value, 'fakeRequestId');
};

export const getSystemConfig = (): AppThunkAction<SystemActionTypes> => async (
  dispatch
) => {
  dispatch({
    type: GET_SYSTEM_REQUEST,
  });
  const systemConfig = await bridgeServices.getSystemConfig();

  if (!systemConfig.hasError) {
    // get Login User Detail
    dispatch({
      type: GET_LOGINUSER_DETAIL_REQUEST,
    });

    const user = await bridgeServices.getEntity<User>({
      entityName: EEntityType.USER,
      id: systemConfig.value.userId,
    });

    if (user.hasError) {
      dispatch({
        type: GET_LOGINUSER_DETAIL_FAIL,
        payload: user.error,
      });
    } else {
      const premise = getUserPremise(user.value.groups);

      /**
       * If user isn't assigned to eigher ONP or OFP, show error
       * This is because the requirement states that
       * it is guaranteed that a user will 100% be assigned to either one, or both.
       */
      if (premise === 'none') {
        dispatch({
          type: GET_LOGINUSER_DETAIL_FAIL,
          payload: 'User must be assigned to either ONP or OFP group',
        });
      } else {
        // TODO: replace this with real API
        const points = await getFakeUserPoints(user.value.id);

        if (points.hasError) {
          dispatch({
            type: GET_LOGINUSER_DETAIL_FAIL,
            payload: points.error,
          });
        }

        dispatch({
          type: GET_LOGINUSER_DETAIL_SUCCESS,
          payload: {
            ...user.value,
            points: points.value,
          },
        });
      }
    }

    dispatch({
      type: GET_SYSTEM_SUCCESS,
      payload: systemConfig.value,
    });
  } else {
    dispatch({
      type: GET_SYSTEM_FAIL,
      payload: systemConfig.value,
    });
  }
};

export const selectPremise = (premise: RedBullPremise): SystemActionTypes => ({
  type: SELECT_PREMISE,
  payload: premise,
});
