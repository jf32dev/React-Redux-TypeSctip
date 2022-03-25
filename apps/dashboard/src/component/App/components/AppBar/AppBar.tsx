import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { AppBar, BurgerIcon, PrimaryMenu } from '@redbull/components';

import { useTranslation } from 'react-i18next';
import SecondaryMenu from './SecondaryMenu';
import SideMenu from './SideMenu';
import SideMenuContent from './SideMenu/SideMenuContent';

import { BreakpointContext } from '../../BreakpointContext';
import { enabledPages } from '../../../../config';

import styles from './AppBar.module.scss';

const ApplicationBar = () => {
  const { t } = useTranslation();
  const params = useRouteMatch('/:page')?.params;
  const page = (params as any)?.page;
  const sideMenuVisible = enabledPages.includes(page);

  const sideMenu = React.useRef<HTMLDivElement>(null);
  const menuToggle = React.useRef<HTMLDivElement>(null);

  const [isSideMenuOpen, setSideMenuOpen] = React.useState(false);

  const { isMobile } = React.useContext(BreakpointContext);

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
            <PrimaryMenu.Item label={t('sections.learn')} to="/learn" />
            <PrimaryMenu.Item label={t('sections.sell')} to="/sell" />
            <PrimaryMenu.Item label={t('sections.execute')} to="/execute" />
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
