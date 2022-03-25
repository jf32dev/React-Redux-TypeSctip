import * as React from 'react';
import { findByTestAttribute, renderWithRedux } from '../../../utils/testUtils';

import AccountListPage from '../AccountListPage';
import { NavigationState } from '../../../store/navigation/type';
import { ApplicationState } from '../../../store';

jest.mock('@redbull/services');

/** React.useState */
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState];
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation(useStateMock);

/**
 * Factory function that returns mounted React Component
 * wrapped in testing wrapper with redux store provider
 * @function setup
 * @param component Takes React Component
 * @returns {ReactWrapper} itself wrapped in testing wrapper
 */
export const setup = (initialState?: NavigationState) =>
  renderWithRedux(<AccountListPage />, {
    initialState: { navigation: initialState } as ApplicationState,
  });

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component');
  expect(component.length).toBe(1);
});
