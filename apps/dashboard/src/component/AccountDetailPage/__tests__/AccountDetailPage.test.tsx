import * as React from 'react';
import routeData from 'react-router';
import { FileState } from 'src/store/files/type';
import { findByTestAttribute, renderWithRedux } from '../../../utils/testUtils';
import AccountDetailPage from '../AccountDetailPage';
import useGetAccountStory from '../../../hooks/useGetAccountStory';
import { NavigationState } from '../../../store/navigation/type';
import { getStoryNavigation } from '../../../store/navigation/action';

import { ApplicationState } from '../../../store';
import { mockChannelNav } from '../../__mocks__/channelNav';
import { mockAccount } from '../../__mocks__/account';
import { mockLanguageMap } from '../../__mocks__/langMap';

jest.mock('@redbull/services');
jest.mock('../../../hooks/useGetAccountStory');
jest.mock('../../../store/navigation/action');

/** useParams - React Router */
const mockUseParams = jest.spyOn(routeData, 'useParams');

/** useGetAccountStory - custom hook */
(useGetAccountStory as jest.Mock).mockReturnValue([
  null, // acount
  jest.fn(), // getAccount
  false, // loading
  null, // error
]);

(getStoryNavigation as jest.Mock).mockReturnValue({ type: '' });

/** React.useState */
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState];
jest.spyOn(React, 'useState').mockImplementation(useStateMock);

/**
 * Factory function that returns mounted React Component
 * wrapped in testing wrapper with redux store provider
 * @function setup
 * @param component Takes React Component
 * @returns {ReactWrapper} itself wrapped in testing wrapper
 */
export const setup = (initialNavState?: NavigationState) =>
  renderWithRedux(<AccountDetailPage />, {
    initialState: {
      navigation: initialNavState,
      files: {
        languageMap: mockLanguageMap,
        thumbnail: [],
        loading: false,
      } as FileState,
    } as ApplicationState,
  });

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, 'component');
  expect(component.length).toBe(1);
});

test('renders Loader when Account Story is being fetched', () => {
  (useGetAccountStory as jest.Mock).mockReturnValueOnce([
    null,
    jest.fn(),
    true, // loading: true
    null,
  ]);
  const wrapper = setup();
  const loader = findByTestAttribute(wrapper, 'loader');
  expect(loader.length).toBe(1);
});

test('renders NoDataError if there is no content and Account Story is not loading', () => {
  const wrapper = setup();
  const noData = findByTestAttribute(wrapper, 'no-data-message');
  expect(noData.length).toBe(1);
});

test('renders DocumentList if type is being passed as a param', () => {
  mockUseParams.mockReturnValueOnce({
    type: 'planograms',
  });
  const wrapper = setup();
  const noData = findByTestAttribute(wrapper, 'document-list');
  expect(noData.length).toBe(1);
});

describe('Channel navigation', () => {
  const mockState = {
    channels: {
      loading: false,
      nav: mockChannelNav,
    },
    stories: {
      nav: {},
      loading: false,
    },
    preselected: null,
  };
  test('sets PageName and PageDescription if channel is present and has no Stories', () => {
    mockUseParams.mockReturnValueOnce({
      virtualId: '21074',
      channelId: '208996',
    });
    setup(mockState);
    // setPageName and setPageDescription should be called
    expect(setState).toHaveBeenCalledTimes(2);
  });

  test('sets PageName, PageDescription and Tiles (to null) if channel is present and storyCount > 0', () => {
    mockUseParams.mockReturnValueOnce({
      virtualId: '21074',
      channelId: '208977',
    });
    setup(mockState);
    // setPageName and setPageDescription and setTiles should be called
    expect(setState).toHaveBeenCalledTimes(3);
    expect(getStoryNavigation).toBeCalledWith(208977);
  });
});

describe('useGetAccountStory', () => {
  test('sets Files if Account is being successfully fetched and has files and Type is being passed as a param', () => {
    mockUseParams.mockReturnValueOnce({
      type: 'agreements',
    });
    (useGetAccountStory as jest.Mock).mockReturnValueOnce([
      mockAccount, // fetched account
      jest.fn(),
      true, // loading: true
      null,
    ]);
    setup();
    // setFiles is being called
    expect(setState).toHaveBeenCalledTimes(1);
  });
  test('sets Files and Tiles if Account is being successfully fetched and has files', () => {
    (useGetAccountStory as jest.Mock).mockReturnValueOnce([
      mockAccount, // fetched account
      jest.fn(),
      true, // loading: true
      null,
    ]);
    setup();
    // setFiles and setTiles is being called
    expect(setState).toHaveBeenCalledTimes(2);
  });
});
