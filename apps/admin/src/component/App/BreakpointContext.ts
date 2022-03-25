import * as React from 'react';

export type ContextProps = {
  viewport: string;
  isMobile: boolean;
  isPortrait: boolean;
};

export const BreakpointContext = React.createContext<ContextProps>({
  viewport: 'md',
  isMobile: false,
  isPortrait: false,
});

export const useBreakpointContext = () => {
  const context = React.useContext<ContextProps>(BreakpointContext);

  if (!context) {
    throw new Error('Breakpoint Context can not be found');
  }
  return context;
};
