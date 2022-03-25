import { capitalize } from 'lodash';
import { findDuplicateSet } from '@redbull/common';
import { Channel, Tab, Story, EEntityType } from '@redbull/services';
import { getPrettyName } from '../../utils/formatter';
import bridgeServices from '../../api/service';
import { VirtualPage } from './type';

/**
 * Grab stories for each 'single story Channel' (channel.storyCount === 1)
 * Channel is not giving stories property on device as it is an optional property
 * thus we need to grab the list and merge the result back.
 * @param {Channel[]} list List of channels to get stories for
 * @returns {Story[]} List of stories for each channel
 */
export const getStoriesForChannelList = async (list: Channel[]) => {
  return Promise.all(
    list.map(({ id }) =>
      bridgeServices.getList<Story>({
        entityName: EEntityType.STORY,
        parentEntityName: EEntityType.CHANNEL,
        peid: id,
        limit: 1,
        includeAttributes: ['channel'],
      })
    )
  );
};

export const createVirtualPage = (tabs: Tab[]) => {
  return tabs.map(
    (tab) =>
      ({
        name: capitalize(tab.name),
        id: tab.id,
        storyCount: tab.channelCount,
        type: tab.name.toLowerCase(),
        thumbnail: tab.thumbnail,
      } as VirtualPage)
  );
};

export const reorderAndSplitChannels = (channelList: Channel[]) => {
  // find duplicate channel with same purpose
  // e.g: Learn_Brand_DE_DE_OFP and Learn_Brand_ITA_ITA_OFP -- same but different country
  const duplicateNames = findDuplicateSet<string>(
    channelList.map(({ name }) => {
      const prettyName = getPrettyName(name);
      if (prettyName) {
        return prettyName.name;
      }
      return name;
    })
  );

  // rename channel if it has duplicates
  const navigation = channelList.filter(hasNoUnique).map((channel) => {
    const pretty = getPrettyName(channel.name);
    if (pretty) {
      const { name, country, region } = pretty;
      if (duplicateNames.has(name) && country) {
        return {
          ...channel,
          name: `${name} (${country}${region ? `-${region}` : ''})`,
        };
      }
      return { ...channel, name };
    }
    return channel;
  });

  // split into 2 categories, channel with 1 story and channel with more than 1 stories
  const [multi, single] = navigation.reduce(
    ([a, b], nav) => {
      if (nav.storyCount > 1) {
        return [[...a, nav], b];
      }
      return [a, [...b, nav]];
    },
    [[], []] as Channel[][]
  );

  return [multi, single];
};

/**
 * Check if Story or Channel name does not contain `unique`
 * @param {Story | Channel} item story or channel object
 * @return {boolean} true if Story or Channel name does not contain 'unique'
 */
export const hasNoUnique = (item: Story | Channel) => {
  const s = item.type === 'story' ? item.title : item.name;
  return !s.toLowerCase().includes('unique');
};
