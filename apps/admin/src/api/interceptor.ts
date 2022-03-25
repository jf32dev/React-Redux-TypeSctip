import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { EHttpStatusCode, ServiceError } from '@redbull/services';
import dayjs from 'dayjs';
import store from '../store/configureStore';
import {
  AUTHENTICATE_FAIL,
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
} from '../store/auth/type';
import { invalidate, refresh } from './services/auth/utils';
import { AuthToken, AuthStorage } from './services/auth/type';

type CacheType = {
  resolve: (onfulfilled: any) => void;
  reject: (onrejected: any) => void;
  error: AxiosError;
};

const cache: CacheType[] = [];

const createCache = (axiosInstance: AxiosInstance, error: AxiosError) => {
  return new Promise<AxiosRequestConfig>((resolve, reject) => {
    cache.push({
      resolve,
      reject,
      error,
    });
  })
    .then((value) => axiosInstance(value))
    .catch((e) => Promise.reject(e));
};

/**
 * Refresh access token based on the stored refresh token.
 * @param axiosInstance
 * @return boolean on success, ServiceError object otherwise.
 */
const refreshToken = async (
  axiosInstance: AxiosInstance
): Promise<true | ServiceError> => {
  const token = window.localStorage.getItem(AuthStorage.REFRESH);
  if (token) {
    // eslint-disable-next-line no-useless-catch
    try {
      const form = new FormData();
      form.append('refresh_token', token);
      const result = await axiosInstance.post<AuthToken>(
        '/api/v1/auth/refresh',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      refresh(result.data);
      return true;
    } catch (e) {
      throw e;
    }
  }
  throw new Error('Refresh token does not exist');
};

export const configMiddleware = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const token = window.localStorage.getItem(AuthStorage.TOKEN);
  return {
    ...config,
    headers: {
      ...config.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
};

export const refreshMiddleware = <T = unknown>(
  axiosInstance: AxiosInstance,
  error: AxiosError<T>
) => {
  const { response } = error;
  const expiresTime = window.localStorage.getItem(AuthStorage.EXPIRES);
  if (response) {
    const { config, status } = response;
    const { dispatch, getState } = store;

    // isAuthRequest is true if request is from /api/v1/auth
    const isAuthRequest = config.url && config.url.includes('/api/v1/auth/');

    // RefreshInProgress is true if cache is not empty and auth status is loading.
    const isRefreshInProgress =
      cache.length > 0 && getState().auth.status === 'loading';

    // isTokenExpired is true if response if unauthorized (401) and token expired.
    const isTokenExpired =
      status === EHttpStatusCode.UNAUTHORIZED &&
      (!expiresTime || dayjs().isAfter(dayjs(expiresTime)));

    /**
     * if response is unauthorized (401) and endpoint is not auth
     */
    if (isTokenExpired && !isAuthRequest) {
      // if token is being refreshed, cache all other concurrent data.
      if (isRefreshInProgress) {
        return createCache(axiosInstance, error);
      }
      // else create another promise to cache the first request,
      // while refreshing the token.

      // NOTE: can't call dispatch refreshToken() from action
      // since it will result in cyclic dependencies.
      dispatch({
        type: AUTHENTICATE_REQUEST,
      });
      refreshToken(axiosInstance)
        .then(() => {
          dispatch({
            type: AUTHENTICATE_SUCCESS,
          });
          // call all the cached requests and redo the request
          // and clear the cache.
          cache.forEach((c) => c.resolve(c.error.config));
          cache.splice(0, cache.length);
        })
        .catch((e) => {
          // NOTE: fail to refresh the token then logout.
          // might change depending on the client use case
          dispatch({
            type: AUTHENTICATE_FAIL,
            error: e.message,
          });
          // reject all the cached requests and clear the cache.
          cache.forEach((c) => c.reject(c.error));
          cache.splice(0, cache.length);
          invalidate();
        });

      return createCache(axiosInstance, error);
    }
  }
  return Promise.reject(error);
};
