/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */

import dayjs from 'dayjs';
import { AuthStorage, AuthToken } from './type';

// default sha256 from internal js
// references: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
const sha256 = async (message: string): Promise<string | null> => {
  try {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray
      .map((b) => `00${b.toString(16)}`.slice(-2))
      .join('');
    return hashHex;
  } catch (e) {
    return null;
  }
};

export const createState = async () => {
  let state;
  const timestamp = new Date().getTime().toString();
  if (window.crypto) {
    state = await sha256(timestamp);
  }

  // if window.crypto is not available or sha returns null / undefined;
  if (!state) {
    state = timestamp + Math.random().toString(20).substr(2);
  }
  const { pathname, search } = window.location;
  window.localStorage.setItem(state, `${pathname}${search}`);
  return state;
};

export const challenge = (state: string) => {
  const validator = window.localStorage.getItem(state);

  // one time use validator
  // invalidate validator after being use for validation.
  window.localStorage.removeItem(state);
  if (validator) {
    return validator;
  }
  return null;
};

export const authorize = (scope: AuthToken) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, refresh_token, expires_in } = scope;
  if (access_token && refresh_token && expires_in) {
    const expiresAt = dayjs().add(Number(expires_in), 'second').toISOString();
    const { TOKEN, REFRESH, EXPIRES } = AuthStorage;
    window.localStorage.setItem(TOKEN, access_token);
    window.localStorage.setItem(REFRESH, refresh_token);
    window.localStorage.setItem(EXPIRES, expiresAt);
  }
};

export const refresh = (scope: AuthToken) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token, refresh_token, expires_in } = scope;
  if (access_token && refresh_token && expires_in) {
    const { TOKEN, REFRESH, EXPIRES } = AuthStorage;
    const expiresAt = dayjs().add(Number(expires_in), 'second').toISOString();
    window.localStorage.setItem(TOKEN, access_token);
    window.localStorage.setItem(REFRESH, refresh_token);
    window.localStorage.setItem(EXPIRES, expiresAt);
  }
};
export const invalidate = () => window.localStorage.clear();
