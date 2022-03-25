import * as React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute } from '../../../utils/testUtils';

import AccountFilter from '../AccountFilter';

/** React.useState */
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState];
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation(useStateMock);

const defaultProps = {
  onFilter: jest.fn(),
  onFilterReset: jest.fn(),
};

/**
 * Factory function that returns Shallow Wrapper for the component
 * @function setup
 * @param component Takes React Component
 * @returns {ShallowWrapper}
 */
export const setup = () => shallow(<AccountFilter {...defaultProps} />);

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders without errors', () => {
  const wrapper = setup();
  const input = findByTestAttribute(wrapper, 'input-component');
  expect(input.length).toBe(1);
});

test('filter value is being set on input change', () => {
  const wrapper = setup();
  const input = findByTestAttribute(wrapper, 'input-component');

  const onInputChange = input.prop('onInput');
  onInputChange &&
    onInputChange({
      currentTarget: { value: 'Hello' },
    } as React.FormEvent<HTMLInputElement>);

  expect(setState).toHaveBeenCalledTimes(1);
  expect(setState).toHaveBeenCalledWith('Hello');
});

test('onFilter is triggered by hitting Enter (keycode 13)', () => {
  const wrapper = setup();
  const input = findByTestAttribute(wrapper, 'input-component');

  const onKeyUp = input.prop('onKeyUp');

  onKeyUp && onKeyUp({ keyCode: 13 } as React.KeyboardEvent<HTMLInputElement>);

  expect(defaultProps.onFilter).toHaveBeenCalledTimes(1);
});

test('filter is reset (handleResetFilter) by hitting Escape (keycode 27)', () => {
  const wrapper = setup();
  const input = findByTestAttribute(wrapper, 'input-component');

  const onKeyUp = input.prop('onKeyUp');
  onKeyUp && onKeyUp({ keyCode: 27 } as React.KeyboardEvent<HTMLInputElement>);

  expect(setState).toHaveBeenCalledTimes(1);
  expect(defaultProps.onFilterReset).toHaveBeenCalledTimes(1);
});

test('onFilter is called when filter icon is clicked', () => {
  const wrapper = setup();
  const input = findByTestAttribute(wrapper, 'input-component');

  const onIconClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => void = input.prop('onIconClick');
  onIconClick &&
    onIconClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>, '');

  expect(defaultProps.onFilter).toHaveBeenCalledTimes(1);
});
