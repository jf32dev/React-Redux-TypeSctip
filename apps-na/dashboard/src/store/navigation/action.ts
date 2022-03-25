import { EEntityType, Channel, Story, Tab } from '@redbull/services';
import { decode } from '@redbull/common';
import { AppThunkAction } from '..';
import {
  NavigationActionTypes,
  GET_CHANNEL_NAVIGATION_REQUEST,
  GET_CHANNEL_NAVIGATION_FAIL,
  GET_CHANNEL_NAVIGATION_SUCCESS,
  GET_STORY_NAVIGATION_REQUEST,
  GET_STORY_NAVIGATION_FAIL,
  GET_STORY_NAVIGATION_SUCCESS,
  SET_PRESELECTED,
  CLEAR_PRESELECTED,
} from './type';
import {
  createVirtualPage,
  getStoriesForChannelList,
  hasNoUnique,
  reorderAndSplitChannels,
} from './utils';
import bridgeServices from '../../api/service';
import sortOrder from './sortOrder';
import { sortAlpha, sortFixedList } from '../../utils';

type TOptions = {
  langMap?: { [key: string]: string };
  limit?: number;
  sort?: 'alphabetical' | 'fixed';
  fixedListKey?: string;
};
const LIMIT = 100;
const defaultOptions: TOptions = {
  limit: LIMIT,
  sort: 'fixed',
};

/**
 * Create channel navigation item.
 * @param {number} page primary id of navigation
 * @param {TOptions & { extra: number} } options sort, limit, fixedsort attributes, with extra id / navigation that can be put under the primary navigation
 */
export const getChannelNavigation = (
  page: number,
  options: TOptions & { extra?: number[] } = defaultOptions
): AppThunkAction<NavigationActionTypes> => async (dispatch) => {
  const { extra, limit, sort, fixedListKey, langMap } = {
    ...defaultOptions,
    ...options,
  };

  dispatch({
    type: GET_CHANNEL_NAVIGATION_REQUEST,
  });

  const channels = await bridgeServices.getList<Channel>({
    entityName: EEntityType.CHANNEL,
    parentEntityName: EEntityType.TAB,
    peid: page,
    limit,
  });

  if (channels.hasError) {
    dispatch({
      type: GET_CHANNEL_NAVIGATION_FAIL,
      payload: JSON.stringify(channels.error),
    });
  }

  // HACK:
  // grab extra pages === extra tabs that needs to be displayed
  // under the channel navigation.
  // this is just a work around since there are not API available really.
  //
  // TODO: Change this once API filter by tab is available
  // currently it is a dumb implementation since it potentially checks everything.
  // THRESHOLD is use to check how many times should the loop runs if the first condition never meet.
  // once the getList API is updated to have filter we can have this better and optimised
  const virtualPage = [];
  let offset = 0;
  const THRESHOLD = 2;
  if (extra && extra.length > 0) {
    while (
      virtualPage.length !== extra.length &&
      offset / LIMIT !== THRESHOLD
    ) {
      // eslint-disable-next-line no-await-in-loop
      const pages = await bridgeServices.getList<Tab>({
        entityName: EEntityType.TAB,
        limit: LIMIT,
        offset,
      });
      if (!pages.hasError) {
        virtualPage.push(...pages.value.filter((p) => extra.includes(p.id)));
      }
      offset += LIMIT;
    }
  }

  const [multiStoryChannel, singleStoryChannel] = reorderAndSplitChannels([
    ...(channels.value || []),
    // create a 'Channel' using 'Tab' details to mock it up
    ...(createVirtualPage(virtualPage) as Channel[]),
  ]);

  // To optimise the resources (in this case is an API Call)
  // get only channel that has storyCount = 1, but doesnt have property called stories
  // eg.: in Device this will always call but will not get a resource scarce because
  // data is cache.
  const storyList = (
    await getStoriesForChannelList(singleStoryChannel.filter((c) => !c.stories))
  )
    .filter((item) => !!item.value && item.value.length > 0)
    .map((item) => item.value[0]); // value is Story[]

  const singleStoryChannelsWithStoryDetail = singleStoryChannel
    .map((channel) => {
      const story = storyList.find((s) => s.channel?.id === channel.id);
      if (story) {
        return {
          ...channel,
          name: decode(channel.name, true),
          description: decode(channel.description, true),
          stories: [story],
        };
      }
      return channel;
    })
    .filter(
      (newChannel) =>
        newChannel.type !== 'channel' ||
        (newChannel.stories && newChannel.stories.length > 0)
    );

  const formatedMultiStoryChannels = multiStoryChannel.map<Channel>((item) => ({
    ...item,
    name: decode(item.name, true),
    description: decode(item.description, true),
  }));

  let list = [
    ...formatedMultiStoryChannels,
    ...singleStoryChannelsWithStoryDetail,
  ];

  if (sort === 'alphabetical') {
    list = list.sort(sortAlpha());
  } else if (sort === 'fixed' && fixedListKey) {
    const order = sortOrder[fixedListKey];
    if (order && langMap) {
      list = list.sort(sortFixedList(order, langMap));
    }
  }

  dispatch({
    type: GET_CHANNEL_NAVIGATION_SUCCESS,
    payload: {
      parent: page,
      list,
    },
  });
};

/**
 * get story navigation
 * @param channel id of parent (channel id)
 * @param {TOptions } options sort, limit, fixedsort attributes.
 */
export const getStoryNavigation = (
  channel: number,
  options: TOptions = defaultOptions
): AppThunkAction<NavigationActionTypes> => async (dispatch) => {
  const { limit, sort, fixedListKey, langMap } = {
    ...defaultOptions,
    ...options,
  };
  dispatch({
    type: GET_STORY_NAVIGATION_REQUEST,
  });
  const storyList = await bridgeServices.getList<Story>({
    entityName: EEntityType.STORY,
    parentEntityName: EEntityType.CHANNEL,
    peid: channel,
    limit,
    ...(sort === 'alphabetical' && { sortBy: 'title' }),
  });
  if (storyList.hasError) {
    dispatch({
      type: GET_STORY_NAVIGATION_FAIL,
      payload: JSON.stringify(storyList.error),
    });
    return;
  }

  let list = storyList.value
    .filter(hasNoUnique)
    .map((item) => ({ ...item, title: decode(item.title, true) }));
  if (sort === 'fixed' && fixedListKey) {
    const order = sortOrder[fixedListKey];
    if (order && langMap) {
      list = list.sort(sortFixedList(order, langMap));
    }
  }
  dispatch({
    type: GET_STORY_NAVIGATION_SUCCESS,
    payload: {
      parent: channel,
      list,
    },
  });
};

export const setPreselected = (title: string) => ({
  type: SET_PRESELECTED,
  payload: title,
});

export const clearPreselected = () => ({ type: CLEAR_PRESELECTED });
