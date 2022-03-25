import * as React from 'react';

export type ContextProps = {
  viewport: string;
  isMobile: boolean;
  isPortrait: boolean;
};

export const BreakpointContext = React.createContext<ContextProps | null>(null);

export const useBreakpointContext = () => {
  const context = React.useContext(BreakpointContext);
  if (!context) {
    throw Error('Breakpoint context not in scope');
  }
  return context;
};
