import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RouterState } from 'connected-react-router';
import { SystemState } from './system/type';
import systemReducer from './system/reducer';
import { TabState } from './tab/type';
import tabReducer from './tab/reducer';
import { CalculatorState } from './calculator/type';
import calculatorReducer from './calculator/reducer';

export interface ApplicationState {
  router: RouterState;
  config: SystemState;
  tabs: TabState;
  calculator: CalculatorState;
}

export type AppThunkAction<TAction, R = void, E = unknown> = (
  dispatch: (action: TAction) => void,
  getState: () => ApplicationState,
  extraArguments: E
) => R;

export const rootReducers = {
  config: systemReducer,
  tabs: tabReducer,
  calculator: calculatorReducer,
};

export const useTypedSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
