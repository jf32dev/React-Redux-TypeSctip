import { Action } from 'redux';
import { File } from '@redbull/services';

export interface FileState {
  thumbnail: File[];
  languageMap: { [key: string]: string };
  loading: boolean;
  error?: any;
}

export const GET_THUMBNAIL_LIST_REQUEST = 'file/getThumbnailListRequest';
export const GET_THUMBNAIL_LIST_SUCCESS = 'file/getThumbnailListSuccess';
export const GET_THUMBNAIL_LIST_FAIL = 'file/getThumbnailListFail';

interface GetThumbnailListRequestAction {
  type: typeof GET_THUMBNAIL_LIST_REQUEST;
}
interface GetThumbnailListSuccessAction
  extends Action<typeof GET_THUMBNAIL_LIST_SUCCESS> {
  payload: {
    thumbnails: File[];
    languageMap: { [key: string]: string };
  };
}

interface GetThumbnailListFailAction {
  type: typeof GET_THUMBNAIL_LIST_FAIL;
  payload: any;
}

export type FileActionTypes =
  | GetThumbnailListRequestAction
  | GetThumbnailListSuccessAction
  | GetThumbnailListFailAction;
