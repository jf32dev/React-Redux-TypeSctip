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
