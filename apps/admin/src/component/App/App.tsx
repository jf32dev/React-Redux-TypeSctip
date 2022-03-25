import React from 'react';
import { useBreakpoint } from '@redbull/common';
import { BreakpointContext } from './BreakpointContext';
import Routes from './Routes';
import '@redbull/common/style/global.scss';

const App = () => {
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
      <Routes />
    </BreakpointContext.Provider>
  );
};

export default App;
