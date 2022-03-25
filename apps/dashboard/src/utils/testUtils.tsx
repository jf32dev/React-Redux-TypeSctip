import * as React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import thunk from 'redux-thunk';

import { MemoryRouter } from 'react-router-dom';
import { ApplicationState, rootReducers } from '../store';

/**
 * Returns node(s) with the given data-test attribute
 * @param {ShallowWrapper} wrapper Enzyme Shallow Wrapper
 * @param {string} val Value of data-test attribute
 */
export const findByTestAttribute = (
  wrapper: Enzyme.ShallowWrapper | Enzyme.ReactWrapper,
  val: string
) => wrapper.find(`[data-test='${val}']`);

export const findByElementId = (
  wrapper: Enzyme.ShallowWrapper | Enzyme.ReactWrapper,
  val: string
) => wrapper.find(`[id='${val}']`);

type TMountWithRedux = {
  initialState?: ApplicationState;
};
/**
 * Returns React Component wrapped in the Provider with Redux store
 * @param {ReactElement} component React component to be rendered
 * @param {Object} initialState Custom State we want to pass to the store
 * @returns {ReactWrapper} Returns itself wrapped in testing wrapper
 */
export const renderWithRedux = (
  component: React.ReactElement,
  { initialState = {} as ApplicationState, ...mountOptions }: TMountWithRedux
) => {
  const store = createStore(
    combineReducers({ ...rootReducers }),
    initialState,
    compose(applyMiddleware(thunk))
  );
  const Wrapper = ({ children }: React.PropsWithChildren<{}>) => (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
  return mount(component, {
    ...mountOptions,
    wrappingComponent: Wrapper,
  });
};
