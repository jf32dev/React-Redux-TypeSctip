import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RouterState } from 'connected-react-router';
import { SystemState } from './system/type';
import systemReducer from './system/reducer';

export interface ApplicationState {
  router: RouterState;
  config: SystemState;
}

export type AppThunkAction<TAction, R = void, E = unknown> = (
  dispatch: (action: TAction) => void,
  getState: () => ApplicationState,
  extraArguments: E
) => R;

export const rootReducers = {
  config: systemReducer,
};

export const useTypedSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
