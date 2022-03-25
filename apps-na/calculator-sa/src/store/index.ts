import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RouterState } from 'connected-react-router';
import { SystemState } from './system/type';
import systemReducer from './system/reducer';
import { CalculatorState } from './calculator/type';
import calculatorReducer from './calculator/reducer';
import { NavigationState } from './navigation/type';
import navigationReducer from './navigation/reducer';
import { TabState } from './tab/type';
import tabReducer from './tab/reducer';
import { ChannelState } from './channels/type';
import channelsReducer from './channels/reducer';

export interface ApplicationState {
  router: RouterState;
  config: SystemState;
  tabs: TabState;
  channels: ChannelState;
  calculator: CalculatorState;
  navigation: NavigationState;
}

export type AppThunkAction<TAction, R = void, E = unknown> = (
  dispatch: (action: TAction) => void,
  getState: () => ApplicationState,
  extraArguments: E
) => R;

export const rootReducers = {
  config: systemReducer,
  tabs: tabReducer,
  channels: channelsReducer,
  calculator: calculatorReducer,
  navigation: navigationReducer,
};

export const useTypedSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
