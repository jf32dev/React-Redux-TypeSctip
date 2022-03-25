import { Action } from 'redux';
import { Channel, Story } from '@redbull/services';

// NOTE: this has to be specified to ensure correct language translation
export type TVirtualPageName = 'accounts';

export type VirtualPage = {
  id: number;
  name: TVirtualPageName;
  storyCount: number;
  thumbnail: string;
  type: string;
};
export interface NavigationState {
  channels: {
    nav: Record<number, Channel[]>;
    loading: boolean;
    error?: any;
  };
  stories: {
    nav: Record<number, Story[]>;
    loading: boolean;
    error?: any;
  };
  preselected: string | null;
}

export const GET_CHANNEL_NAVIGATION_REQUEST =
  'navigation/getChannelNavigationRequest';
export const GET_CHANNEL_NAVIGATION_SUCCESS =
  'navigation/getChannelNavigationSuccess';
export const GET_CHANNEL_NAVIGATION_FAIL =
  'navigation/getChannelNavigationFail';

export const GET_STORY_NAVIGATION_REQUEST =
  'navigation/getStoryNavigationRequest';
export const GET_STORY_NAVIGATION_SUCCESS =
  'navigation/getStoryNavigationSuccess';
export const GET_STORY_NAVIGATION_FAIL = 'navigation/getStoryNavigationFail';

export const SET_PRESELECTED = 'navigation/setPreselected';
export const CLEAR_PRESELECTED = 'navigation/clearPreselected';

interface GetChannelNavigationRequestAction {
  type: typeof GET_CHANNEL_NAVIGATION_REQUEST;
}

interface GetChannelNavigationSuccessAction
  extends Action<typeof GET_CHANNEL_NAVIGATION_SUCCESS> {
  payload: {
    parent: number;
    list: Channel[];
  };
}

interface GetChannelNavigationErrorAction
  extends Action<typeof GET_CHANNEL_NAVIGATION_FAIL> {
  payload: any;
}

interface GetStoryNavigationRequestAction {
  type: typeof GET_STORY_NAVIGATION_REQUEST;
}

interface GetStoryNavigationSuccessAction
  extends Action<typeof GET_STORY_NAVIGATION_SUCCESS> {
  payload: {
    parent: number;
    list: Story[];
  };
}

interface GetStoryNavigationFailAction
  extends Action<typeof GET_STORY_NAVIGATION_FAIL> {
  payload: any;
}

interface SetPreselectedAction extends Action<typeof SET_PRESELECTED> {
  payload: string;
}

interface ClearPreselectedAction {
  type: typeof CLEAR_PRESELECTED;
}

export type NavigationActionTypes =
  | GetChannelNavigationRequestAction
  | GetChannelNavigationSuccessAction
  | GetChannelNavigationErrorAction
  | GetStoryNavigationRequestAction
  | GetStoryNavigationSuccessAction
  | GetStoryNavigationFailAction
  | SetPreselectedAction
  | ClearPreselectedAction;
