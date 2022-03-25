import React from 'react';
import { useDispatch } from 'react-redux';

import { Loader, ELoaderSize } from '@redbull/components';
import { useBreakpoint } from '@redbull/common';
import '@redbull/common/style/global.scss';

import { useHistory } from 'react-router';
import { getSystemConfig } from '../../store/system/action';
import { getPersonalTab } from '../../store/tab/action';
import { useTypedSelector } from '../../store';
import { BreakpointContext } from './BreakpointContext';
import Routes from './Routes';
import i18n from '../../i18n';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginUserId, loading, locale } = useTypedSelector(
    (state) => state.config
  );
  const { viewportSize: bp, orientation } = useBreakpoint();
  const isMobile = ['xs', 'sm'].includes(bp);
  const isPortrait = orientation === 'portrait';

  React.useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale);
    } else {
      dispatch(getSystemConfig());
    }
  }, [dispatch, locale]);

  React.useEffect(() => {
    if (loginUserId) {
      dispatch(getPersonalTab());
    }
  }, [dispatch, loginUserId]);

  React.useEffect(() => {
    history.replace('/calculator');
  }, [history]);

  return (
    <BreakpointContext.Provider
      value={{
        viewport: bp,
        isMobile,
        isPortrait,
      }}
    >
      {loading || !loginUserId || !locale ? (
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
