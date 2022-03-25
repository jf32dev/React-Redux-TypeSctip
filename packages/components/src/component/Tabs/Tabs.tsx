import * as React from 'react';
import cx from 'classnames';

import { usePrevious } from '@redbull/common';

import { TabsContext } from './TabsContext';
import TabLabel from './TabLabel';
import TabContent from './TabContent';

import styles from './Tabs.module.scss';

type Props = {
  className?: string;
  defaultActiveId: string;
  children: React.ReactNodeArray;
  onSelect?: (activeTab: string) => void;
};

const Tabs = ({ className, children, defaultActiveId, onSelect }: Props) => {
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const [activeTabId, setActiveTabId] = React.useState(defaultActiveId);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [tabLabels, setTabLabels] = React.useState<React.ReactNodeArray>([]);
  const [tabLabelsDesktop, setTabLabelsDesktop] = React.useState<
    React.ReactNodeArray
  >([]);
  const previousTab = usePrevious(activeTabId);

  const tabContent: React.ReactNodeArray = (children as any)?.filter(
    (child: any) => child.type.displayName === 'TabContent'
  );

  const toggleMenu = () => {
    setMenuOpen((isOpen) => !isOpen);
  };

  const handleClickAway = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
      setMenuOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('click', handleClickAway);
    return () => window.removeEventListener('click', handleClickAway);
  }, []);

  React.useEffect(() => {
    /** Display functionality for tabs in mobile view:
     * - always 2 tabs displayed, rest in dropdown
     * - tab options swap in pairs:
     *   selecting tab from dropdown will put
     *   the selected tab and its neighbour
     *   on display and the rest to dropdown
     */
    const tab: any = tabLabels.find(
      (label: any) => label.props.id === activeTabId
    );

    if (tab && tab.key) {
      let newLabels: React.ReactNodeArray = [];
      const first = tab.key % 2 === 0 ? Number(tab.key) : Number(tab.key - 1);
      const second = tab.key % 2 === 0 ? Number(tab.key) + 1 : Number(tab.key);

      const firstTab = tabLabels.find((l: any) => Number(l.key) === first);
      const secondTab = tabLabels.find((l: any) => Number(l.key) === second);

      newLabels = [
        ...(firstTab ? [firstTab] : []),
        ...(secondTab ? [secondTab] : []),
        ...tabLabels
          .filter(
            (l: any) => Number(l.key) !== first && Number(l.key) !== second
          )
          .sort((a: any, b: any) => a.key - b.key),
      ];
      setTabLabels(newLabels);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabId]);

  React.useEffect(() => {
    if (onSelect && previousTab !== activeTabId) {
      onSelect(activeTabId);
    }
  }, [activeTabId, onSelect, previousTab]);

  React.useEffect(() => {
    const labels: React.ReactNodeArray = (children as any)?.filter(
      (child: any) => child.type.displayName === 'TabLabel'
    );
    setTabLabels(labels);
    setTabLabelsDesktop(labels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <TabsContext.Provider value={{ activeTabId, setActiveTabId }}>
      <div className={cx(styles.container, className)}>
        {/* DESKTOP */}
        <div className={cx(styles.labels, styles.desktop)}>
          {tabLabelsDesktop}
        </div>
        {/* MOBILE */}
        <div className={cx(styles.labels, styles.mobile)}>
          {tabLabels.slice(0, 2)}
          <div
            ref={dropdownRef}
            className={cx(styles.toggle, menuOpen && styles.active)}
            onClick={toggleMenu}
          >
            <div className={styles.dots} />
            <div className={cx(styles.dropdown, menuOpen && styles.open)}>
              {tabLabels.slice(2)}
            </div>
          </div>
        </div>
        {/* CONTENT */}
        <div className={styles.content}>{tabContent}</div>
      </div>
    </TabsContext.Provider>
  );
};

Tabs.Label = TabLabel;
Tabs.Content = TabContent;

export default Tabs;
