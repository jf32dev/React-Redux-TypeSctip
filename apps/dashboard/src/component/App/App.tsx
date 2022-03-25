import React from 'react';
import { useDispatch } from 'react-redux';

import { Loader, ELoaderSize } from '@redbull/components';
import { useBreakpoint } from '@redbull/common';
import i18n from '../../i18n';
import { getSystemConfig } from '../../store/system/action';
import { getPersonalTab } from '../../store/tab/action';
import { useTypedSelector } from '../../store';

import { BreakpointContext } from './BreakpointContext';

import { getThumbnailLibrary } from '../../store/files/action';
import Routes from './Routes';

import '@redbull/common/style/global.scss';

const App = () => {
  const dispatch = useDispatch();
  const { loginUserId, loading } = useTypedSelector((state) => state.config);
  const language = useTypedSelector((state) => state.config.locale);
  const { viewportSize: bp, orientation } = useBreakpoint();
  const isMobile = ['xs', 'sm'].includes(bp);
  const isPortrait = orientation === 'portrait';

  React.useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    } else {
      dispatch(getSystemConfig());
    }
  }, [dispatch, language]);

  React.useEffect(() => {
    if (loginUserId) {
      dispatch(getPersonalTab());
      dispatch(getThumbnailLibrary());
    }
  }, [dispatch, loginUserId]);

  return (
    <BreakpointContext.Provider
      value={{
        viewport: bp,
        isMobile,
        isPortrait,
      }}
    >
      {loading || !loginUserId || !language ? (
        <div className="loading">
          <Loader size={isMobile ? ELoaderSize.MEDIUM : ELoaderSize.LARGE} />
        </div>
      ) : (
        <Routes />
      )}
    </BreakpointContext.Provider>
  );
};

export default App;
