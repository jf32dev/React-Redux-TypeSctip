import * as React from 'react';
import { EEntityType } from '@redbull/services';
import { TabState } from '../../../../../store/tab/type';
import { ApplicationState } from '../../../../../store';
import {
  findByElementId,
  findByTestAttribute,
  renderWithRedux,
} from '../../../../../utils/testUtils';
import { setDashboardSelectedTab } from '../../../../../store/dashboard/action';
import { getBookmarkList } from '../../../../../store/bookmark/action';
import { getStories, getPopular } from '../../../../../store/stories/action';

import MyDocuments from '../MyDocuments';

const SET_SELECTED_TAB = 'setSelectedTab';
const GET_BOOKMARK_LIST = 'getBookmarkList';
const GET_STORIES = 'getStories';
const STORIES_LIMIT = 10;

jest.mock('@redbull/services');
jest.mock('../../../../../store/dashboard/action');
jest.mock('../../../../../store/stories/action');
jest.mock('../../../../../store/bookmark/action');

(setDashboardSelectedTab as jest.Mock).mockReturnValue({
  type: SET_SELECTED_TAB,
});
(getBookmarkList as jest.Mock).mockReturnValue({ type: GET_BOOKMARK_LIST });
(getStories as jest.Mock).mockReturnValue({ type: GET_STORIES });
(getPopular as jest.Mock).mockReturnValue({ type: GET_STORIES });

/**
 * Factory function that returns mounted React Component
 * wrapped in testing wrapper with redux store provider
 * @function setup
 * @param component Takes React Component
 * @returns {ReactWrapper} itself wrapped in testing wrapper
 */
const setup = (initialState?: TabState) =>
  renderWithRedux(<MyDocuments />, {
    initialState: { tabs: initialState } as ApplicationState,
  });

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders Tabs without errors', () => {
  const wrapper = setup();
  const myDocuments = findByTestAttribute(wrapper, 'tabs-component');
  expect(myDocuments.length).toBe(1);
});

describe('handleTabChange', () => {
  // each tab is being rendered twice (mobile and desktop)
  test('dispatch getBookmarkList action when Bookmarks is activeTab', () => {
    const wrapper = setup();
    const bookmarkTab = findByElementId(wrapper, 'bookmarks');
    bookmarkTab.first().simulate('click');
    expect(getBookmarkList).toHaveBeenCalledTimes(1);
  });

  test('dispatch getStories when My Files is activeTab and personalTab is not null', () => {
    const wrapper = setup({ personalTab: 1, loading: false });
    const filesTab = findByElementId(wrapper, 'my-files');
    filesTab.first().simulate('click');
    expect(getStories).toHaveBeenCalledTimes(1);
    expect(getStories).toBeCalledWith({
      limit: STORIES_LIMIT,
      parentEntityName: EEntityType.TAB,
      peid: 1,
    });
  });

  test('dispatch getStories when Popular is activeTab', () => {
    const wrapper = setup();
    const filesTab = findByElementId(wrapper, 'popular');
    filesTab.first().simulate('click');
    expect(getPopular).toHaveBeenCalledTimes(1);
  });

  test('dispatch getStories when Latest Updates is activeTab', () => {
    const wrapper = setup();
    const filesTab = findByElementId(wrapper, 'latest-updates');
    filesTab.first().simulate('click');
    expect(getStories).toHaveBeenCalledTimes(1);
    expect(getStories).toBeCalledWith({
      sortBy: 'createDate',
      limit: STORIES_LIMIT,
    });
  });
});
