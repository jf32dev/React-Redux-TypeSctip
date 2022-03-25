import { Action } from 'redux';
import { Story, File } from '@redbull/services';

export interface BookmarkState {
  story: {
    data: Story[];
    hasMore: boolean;
  };
  file: {
    data: File[];
    hasMore: boolean;
  };
  collection: (Story | File)[];
  loading: boolean;
  error?: any;
}

export const GET_BOOKMARK_REQUEST = 'bookmark/getBookmarkRequest';
export const GET_BOOKMARK_SUCCESS = 'bookmark/getBookmarkSuccess';
export const GET_BOOKMARK_FAIL = 'bookmark/getBookmarkFail';

export const OPEN_STORY = 'story/openStory';

interface GetBookmarkRequestAction {
  type: typeof GET_BOOKMARK_REQUEST;
}

interface GetBookmarkSuccessAction extends Action<typeof GET_BOOKMARK_SUCCESS> {
  payload: {
    story: {
      data: Story[];
      hasMore: boolean;
    };
    file: {
      data: File[];
      hasMore: boolean;
    };
    collection: (Story | File)[];
  };
}

interface GetBookmarkFailAction extends Action<typeof GET_BOOKMARK_FAIL> {
  payload: any;
}

export type BookmarkActionTypes =
  | GetBookmarkRequestAction
  | GetBookmarkSuccessAction
  | GetBookmarkFailAction;
