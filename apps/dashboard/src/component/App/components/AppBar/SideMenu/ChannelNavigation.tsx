import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useRouteMatch } from 'react-router-dom';

import { Menu } from '@redbull/components';
import { Channel } from '@redbull/services';

import { getNameWithoutCountry } from '../../../../../utils/formatter';
import { useTypedSelector } from '../../../../../store';
import { getStoryNavigation } from '../../../../../store/navigation/action';

type TChannelNavigation = {
  channel: Channel;
  currentPage: string;
};

const ChannelNavigation = ({ channel, currentPage }: TChannelNavigation) => {
  const dispatch = useDispatch();
  // if route match below then get the currentChannelId on the route
  const matchChannel = useRouteMatch('/:page/channel/:channel')?.params;
  const selectedChannelId = +((matchChannel as any)?.channel || '');
  const stories = useTypedSelector((state) => state.navigation.stories.nav);
  const langMap = useTypedSelector((state) => state.files.languageMap);
  const onChannelMenuToggle = (id: number, isOpen: boolean) => {
    if (isOpen) {
      dispatch(push(`/${currentPage}/channel/${id}`));
    }
  };

  // if ChannelId change trigger the story navigation
  React.useEffect(() => {
    if (selectedChannelId === channel.id && channel.storyCount > 1) {
      dispatch(
        getStoryNavigation(Number(selectedChannelId), {
          langMap,
          sort: 'fixed',
          fixedListKey: langMap[
            getNameWithoutCountry(channel.name).toLowerCase()
          ].toLowerCase(),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel.id, channel.storyCount, selectedChannelId, dispatch]);

  if (channel && channel.storyCount > 1 && stories) {
    return (
      <Menu.Heading
        contentLoading={
          !stories[selectedChannelId] && selectedChannelId === channel.id
        }
        id={channel.id}
        label={channel.name}
        openDefault={channel.id === selectedChannelId ? true : undefined}
        onToggle={onChannelMenuToggle}
      >
        {stories[channel.id] && (
          <Menu.SubMenu level={2}>
            {stories[channel.id].map((story) => (
              <Menu.Item
                key={story.id}
                label={story.title}
                linkTo={`/${currentPage}/channel/${channel.id}/story/${story.id}`}
              />
            ))}
          </Menu.SubMenu>
        )}
      </Menu.Heading>
    );
  }
  if (channel.storyCount === 1) {
    return (
      <Menu.Item
        key={channel.id}
        label={channel.name}
        linkTo={`/${currentPage}/channel/${channel.id}/story/${
          channel.stories && channel.stories[0].id
        }`}
      />
    );
  }
  return null;
};

ChannelNavigation.displayName = 'ChannelNavigation';

export default ChannelNavigation;
