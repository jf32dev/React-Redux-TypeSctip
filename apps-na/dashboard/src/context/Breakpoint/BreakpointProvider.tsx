import * as React from 'react';
import { useBreakpoint } from '@redbull/common';
import { BreakpointContext } from './BreakpointContext';

const BreakpointProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { viewportSize: bp, orientation } = useBreakpoint();
  const isMobile = ['xs', 'sm'].includes(bp);
  const isPortrait = orientation === 'portrait';

  return (
    <BreakpointContext.Provider
      value={{
        viewport: bp,
        isMobile,
        isPortrait,
      }}
    >
      {children}
    </BreakpointContext.Provider>
  );
};

export default BreakpointProvider;
