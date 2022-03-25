import thunk from 'redux-thunk';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import devToolsEnhancer from 'remote-redux-devtools';
import { rootReducers, ApplicationState } from '.';

const configureStore = (history: History, initialState?: ApplicationState) => {
  const rootReducer = combineReducers({
    ...rootReducers,
    router: connectRouter(history),
  });

  const middleware = [thunk, routerMiddleware(history)];

  const enhancers = [];
  const windowIfDefined =
    typeof window === 'undefined' ? null : (window as any);

  if (
    windowIfDefined &&
    windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ &&
    process.env.NODE_ENV === 'development'
  ) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  } else if (devToolsEnhancer && process.env.NODE_ENV === 'development') {
    enhancers.push(devToolsEnhancer({ port: 8000 }));
  }

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
};

export default configureStore;
