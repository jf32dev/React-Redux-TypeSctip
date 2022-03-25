import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useRouteMatch } from 'react-router';

import { Menu } from '@redbull/components';

import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../../../../store';
import {
  VirtualPage,
  TVirtualPageName,
} from '../../../../../store/navigation/type';
import { getChannelNavigation } from '../../../../../store/navigation/action';

type TVirtualNavigation = {
  currentPage: string;
  virtualPage: VirtualPage; // really this is not a channel
};

/* Virtual Navigation that acts as another Tab */
const VirtualNavigation = ({
  currentPage,
  virtualPage,
}: TVirtualNavigation) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useTypedSelector((state) => state.navigation.channels.nav);

  const matchVirtual = useRouteMatch('/:page/accounts/:virtualid')?.params;
  const selectedId = Number((matchVirtual as any)?.virtualid || '');

  const onChannelMenuToggle = (id: number, isOpen: boolean) => {
    if (isOpen) {
      dispatch(push(`/${currentPage}/accounts/${id}`));
    }
  };

  React.useEffect(() => {
    if (selectedId) {
      dispatch(
        getChannelNavigation(selectedId, {
          limit: 200,
          sort: 'alphabetical',
        })
      );
    }
  }, [dispatch, selectedId]);

  // Assuming that virtual navigation is always has 1 or more channels.
  return (
    <Menu.Heading
      contentLoading={
        !channels[virtualPage.id] && virtualPage.id === selectedId
      }
      id={virtualPage.id}
      label={t(
        `sections.${
          virtualPage.name.toLowerCase() as TVirtualPageName
        }` as const
      )}
      openDefault={virtualPage.id === selectedId ? true : undefined}
      onToggle={onChannelMenuToggle}
    >
      {channels[virtualPage.id] && (
        <Menu.SubMenu level={2}>
          {channels[virtualPage.id].map((channel) => (
            <Menu.Item
              key={channel.id}
              label={channel.name}
              linkTo={`/${currentPage}/accounts/${virtualPage.id}/channel/${channel.id}`}
            />
          ))}
        </Menu.SubMenu>
      )}
    </Menu.Heading>
  );
};

VirtualNavigation.displayName = 'AccountNavigation';

export default VirtualNavigation;
