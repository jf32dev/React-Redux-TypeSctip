import * as React from 'react';

interface ITabsContext {
  activeTabId: string;
  setActiveTabId: (label: string) => void;
}

export const TabsContext = React.createContext<ITabsContext>({
  activeTabId: '',
  setActiveTabId: () => null,
});

export const useTabsContext = () => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error(
      'Tabs compound components cannot be rendered outside the Tabs component.'
    );
  }

  return context;
};
