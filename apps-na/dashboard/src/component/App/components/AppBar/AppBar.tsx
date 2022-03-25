import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { AppBar, BurgerIcon, PrimaryMenu } from '@redbull/components';

import SecondaryMenu from './SecondaryMenu';
import SideMenu from './SideMenu';
import SideMenuContent from './SideMenu/SideMenuContent';

import { enabledPages } from '../../../../config';

import styles from './AppBar.module.scss';
import { useBreakpointContext } from '../../../../context/Breakpoint';
import { useTypedSelector } from '../../../../store';

const ApplicationBar = () => {
  const params = useRouteMatch('/:page')?.params;
  const page = (params as any)?.page;
  const sideMenuVisible = enabledPages.includes(page);

  const sideMenu = React.useRef<HTMLDivElement>(null);
  const menuToggle = React.useRef<HTMLDivElement>(null);

  const [isSideMenuOpen, setSideMenuOpen] = React.useState(false);

  const { isMobile } = useBreakpointContext();

  const { selected: selectedPremise } = useTypedSelector(
    (state) => state.config.premise
  );

  const toggleSideMenu = () => {
    setSideMenuOpen((open) => !open);
  };

  const handleClickAway = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (
      sideMenu.current &&
      !sideMenu.current.contains(target) &&
      menuToggle.current &&
      !menuToggle.current.contains(target)
    ) {
      setSideMenuOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('click', handleClickAway);
    return () => window.removeEventListener('click', handleClickAway);
  }, []);

  return (
    <nav className={styles.primarynav} role="navigation">
      <AppBar
        burger={
          <BurgerIcon
            ref={menuToggle}
            className={styles.burger}
            isOpen={isSideMenuOpen}
            onClick={toggleSideMenu}
          />
        }
        primaryMenu={
          <PrimaryMenu className={styles.primaryMenu}>
            <PrimaryMenu.Item label="Learn" to="/learn" />
            <PrimaryMenu.Item label="Sell & Execute" to="/sell" />
            {selectedPremise === 'OFP' && (
              <PrimaryMenu.Item label="Earn" to="/earn" />
            )}
          </PrimaryMenu>
        }
        secondaryMenu={<SecondaryMenu />}
      />
      {(isMobile || sideMenuVisible) && (
        <>
          {isSideMenuOpen && <div className={styles.overlay} />}
          <SideMenu ref={sideMenu} isOpen={isSideMenuOpen}>
            <SideMenuContent />
          </SideMenu>
        </>
      )}
    </nav>
  );
};

export default ApplicationBar;
