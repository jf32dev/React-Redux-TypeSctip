import * as React from 'react';
import {
  AppBar,
  Dropdown,
  EUserProfileSize,
  PrimaryMenu,
  UserProfile,
} from '@redbull/components';
import '@redbull/common/style/global.scss';
import cx from 'classnames';
import { useTypedSelector } from '../../store';
import { invalidate } from '../../api/services/auth/utils';
import { useBreakpointContext } from './BreakpointContext';
import styles from './Layout.module.scss';

const Layout = ({ children }: React.PropsWithChildren<any>) => {
  const profile = useTypedSelector((state) => state.account.personalDetail);
  const breakpoint = useBreakpointContext();
  return (
    <>
      <AppBar
        hideLogo={breakpoint.isMobile}
        primaryMenu={
          <PrimaryMenu
            className={cx(
              styles.primaryMenu,
              breakpoint.isMobile && styles.unpadded
            )}
          >
            <PrimaryMenu.Item label="Calculator Data" to="/calculator" />
          </PrimaryMenu>
        }
        secondaryMenu={
          <Dropdown
            direction="left"
            toggle={
              <UserProfile
                imageSrc={profile?.thumbnail}
                size={EUserProfileSize.MEDIUM}
              />
            }
          >
            <Dropdown.Item link="/" disabled>
              {profile?.firstName} {profile?.lastName}
            </Dropdown.Item>
            <Dropdown.Item link="/" onClick={invalidate}>
              Logout
            </Dropdown.Item>
          </Dropdown>
        }
      />
      {children}
    </>
  );
};

export default Layout;
