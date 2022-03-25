import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { push } from 'connected-react-router';
import { capitalize, findKey, isEqual, partial } from 'lodash';

import { Menu } from '@redbull/components';
import { useTranslation } from 'react-i18next';
import ChannelNavigation from './ChannelNavigation';
import AccountNavigation from './AccountNavigation';

import { useTypedSelector } from '../../../../../store';
import { BreakpointContext } from '../../../BreakpointContext';
import { VirtualPage } from '../../../../../store/navigation/type';
import styles from './SideMenu.module.scss';
import {
  getChannelNavigation,
  clearPreselected,
} from '../../../../../store/navigation/action';
import envConfig, { enabledPages } from '../../../../../config';

type TPageParams = {
  page: string;
  channel?: string;
};

const SideMenuContent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { navigation } = envConfig;
  const { isMobile } = React.useContext(BreakpointContext);
  const matchPage = useRouteMatch<TPageParams>('/:page')?.params;
  const selectedPage = matchPage?.page || '';
  const selectedPageId = +envConfig.navigation[selectedPage];

  const channels = useTypedSelector((state) => state.navigation.channels.nav);
  const preselected = useTypedSelector((state) => state.navigation.preselected);
  const langMap = useTypedSelector((state) => state.files.languageMap);

  const onTabMenuToggle = (id: number, isOpen: boolean) => {
    if (isOpen) {
      // assuming the id is always correct since it is coming from the same source
      // from environment variable
      const path = findKey(navigation, partial(isEqual, id.toString()));
      dispatch(push(`/${path}`));
    }
  };

  React.useEffect(() => {
    if (selectedPageId && Object.keys(langMap).length) {
      if (selectedPageId === +navigation.execute) {
        dispatch(
          getChannelNavigation(selectedPageId, {
            extra: [Number(navigation.account)],
            fixedListKey: selectedPage,
            langMap,
          })
        );
      } else {
        dispatch(
          getChannelNavigation(selectedPageId, {
            fixedListKey: selectedPage,
            langMap,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedPageId, langMap]);

  React.useEffect(() => {
    if (preselected && channels && channels[selectedPageId]) {
      const channel = channels[selectedPageId].find(
        (nav) => nav.name.toLowerCase().indexOf(preselected.toLowerCase()) > -1
      );

      if (channel) {
        const { stories } = channel;
        if (stories && channel.storyCount === 1) {
          dispatch(
            push(
              `/${selectedPage}/channel/${channel.id}/story/${stories[0].id}`
            )
          );
        } else {
          dispatch(push(`/${selectedPage}/channel/${channel.id}`));
        }
        dispatch(clearPreselected());
      }
    }
  }, [channels, dispatch, selectedPage, preselected, selectedPageId]);

  return (
    <Menu>
      {enabledPages.map((menu) => {
        const menuId = +navigation[menu];
        // if it is not mobile display only the selected parent menu
        if (!isMobile && menuId !== selectedPageId) {
          return null;
        }
        return (
          <Menu.Heading
            key={menuId}
            contentLoading={
              channels && !channels[menuId] && menuId === selectedPageId
            }
            id={menuId}
            label={capitalize(
              t(`sections.${menu as 'learn' | 'sell' | 'execute'}` as const)
            )}
            openDefault={menuId === selectedPageId ? true : undefined}
            onToggle={onTabMenuToggle}
          >
            {channels &&
              channels[menuId] &&
              (channels[menuId].length > 0 ? (
                <Menu.SubMenu level={1}>
                  {channels[menuId].map((channel) =>
                    // if it is the 'virtual page' then render the other navigation
                    // as for now it is an account navigation we probably can make it
                    // generic later on
                    channel.type === 'channel' ? (
                      <ChannelNavigation
                        key={channel.id}
                        channel={channel}
                        currentPage={selectedPage}
                      />
                    ) : (
                      <AccountNavigation
                        key={channel.id}
                        currentPage={selectedPage}
                        virtualPage={channel as VirtualPage}
                      />
                    )
                  )}
                </Menu.SubMenu>
              ) : (
                <Menu.SubMenu level={1}>
                  <span className={styles['no-content']}>
                    {t('errorMessages.noContent')}
                  </span>
                </Menu.SubMenu>
              ))}
          </Menu.Heading>
        );
      })}
    </Menu>
  );
};

export default SideMenuContent;
