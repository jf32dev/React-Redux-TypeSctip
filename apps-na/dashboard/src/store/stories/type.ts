import { Action } from 'redux';
import { Story, File } from '@redbull/services';

export interface StoryState {
  listStory: {
    data: Story[];
    hasMore: boolean;
  };
  listFile: {
    data: File[];
    hasMore: boolean;
  };
  list: (Story | File)[];
  story: Story | null;
  loading: boolean;
  error?: any;
  hasMore: boolean;
}

export const GET_STORY_LIST_REQUEST = 'story/getStoryListRequest';
export const GET_STORY_LIST_SUCCESS = 'story/getStoryListSuccess';
export const GET_STORY_LIST_FAIL = 'story/getStoryListFail';

export const GET_STORY_BY_ID_REQUEST = 'story/getStoryByIdRequest';
export const GET_STORY_BY_ID_SUCCESS = 'story/getStoryByIdSuccess';
export const GET_STORY_BY_ID_FAIL = 'story/getStoryByIdFail';

export const CLEAR_STORY_LIST = 'story/clearStoryList';
export const CLEAR_STORY = 'story/clearStory';

interface GetStoryListRequestAction {
  type: typeof GET_STORY_LIST_REQUEST;
}
interface GetStoryListSuccessAction
  extends Action<typeof GET_STORY_LIST_SUCCESS> {
  payload: {
    listFile?: {
      data: File[];
      hasMore: boolean;
    };
    listStory?: {
      data: Story[];
      hasMore: boolean;
    };
    data: (Story | File)[];
    hasMore: boolean;
  };
}

interface GetStoryListFailAction {
  type: typeof GET_STORY_LIST_FAIL;
  payload: any;
}

interface GetStoryByIdRequestAction {
  type: typeof GET_STORY_BY_ID_REQUEST;
}
interface GetStoryByIdSuccessAction
  extends Action<typeof GET_STORY_BY_ID_SUCCESS> {
  payload: Story;
}

interface GetStoryByIdFailAction {
  type: typeof GET_STORY_BY_ID_FAIL;
  payload: any;
}

interface ClearStoryListAction {
  type: typeof CLEAR_STORY_LIST;
}

interface ClearStoryAction {
  type: typeof CLEAR_STORY;
}

export type StoryActionTypes =
  | GetStoryListRequestAction
  | GetStoryListSuccessAction
  | GetStoryListFailAction
  | GetStoryByIdRequestAction
  | GetStoryByIdSuccessAction
  | GetStoryByIdFailAction
  | ClearStoryListAction
  | ClearStoryAction;
