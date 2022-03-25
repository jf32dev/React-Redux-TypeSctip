import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RouterState } from 'connected-react-router';
import accountReducer from './account/reducer';
import applicationReducer from './application/reducer';
import authReducer from './auth/reducer';
import calculatorReducer from './calculator/reducer';
import productReducer from './product/reducer';
import sliderReducer from './slider/reducer';
import { AccountState } from './account/type';
import { ApplicationState } from './application/type';
import { AuthState } from './auth/type';
import { CalculatorState } from './calculator/type';
import { ProductState } from './product/type';
import { SliderState } from './slider/type';

export interface State {
  account: AccountState;
  auth: AuthState;
  application: ApplicationState;
  calculator: CalculatorState;
  product: ProductState;
  router: RouterState;
  slider: SliderState;
}

export type AppThunkAction<TAction, R = void, E = unknown> = (
  dispatch: (action: TAction) => void,
  getState: () => State,
  extraArguments: E
) => R;

export const rootReducers = {
  account: accountReducer,
  application: applicationReducer,
  auth: authReducer,
  calculator: calculatorReducer,
  product: productReducer,
  slider: sliderReducer,
};

export const useTypedSelector: TypedUseSelectorHook<State> = useSelector;
