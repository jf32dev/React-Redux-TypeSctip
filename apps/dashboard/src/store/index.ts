import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RouterState } from 'connected-react-router';
import { SystemState } from './system/type';
import systemReducer from './system/reducer';
import { ChannelState } from './channels/type';
import channelsReducer from './channels/reducer';
import { StoryState } from './stories/type';
import storiesReducer from './stories/reducer';
import { BookmarkState } from './bookmark/type';
import bookmarkReducer from './bookmark/reducer';
import { NavigationState } from './navigation/type';
import navigationReducer from './navigation/reducer';
import { FileState } from './files/type';
import fileReducer from './files/reducer';
import { TabState } from './tab/type';
import tabReducer from './tab/reducer';
import { DashboardState } from './dashboard/type';
import dashboardReducer from './dashboard/reducer';
import { SearchState } from './search/type';
import searchReducer from './search/reducer';

export interface ApplicationState {
  router: RouterState;
  config: SystemState;
  dashboard: DashboardState;
  tabs: TabState;
  channels: ChannelState;
  stories: StoryState;
  files: FileState;
  bookmark: BookmarkState;
  navigation: NavigationState;
  search: SearchState;
}

export type AppThunkAction<TAction, R = void, E = unknown> = (
  dispatch: (action: TAction) => void,
  getState: () => ApplicationState,
  extraArguments: E
) => R;

export const rootReducers = {
  config: systemReducer,
  dashboard: dashboardReducer,
  tabs: tabReducer,
  channels: channelsReducer,
  stories: storiesReducer,
  files: fileReducer,
  bookmark: bookmarkReducer,
  navigation: navigationReducer,
  search: searchReducer,
};

export const useTypedSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
