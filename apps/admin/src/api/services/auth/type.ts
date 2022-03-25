/* eslint-disable camelcase */

export interface AuthToken {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}
export interface AuthLogin {
  state: string;
  code: string;
}

export enum AuthStorage {
  'TOKEN' = 'rbtka',
  'REFRESH' = 'rbtkr',
  'EXPIRES' = 'expires',
}
