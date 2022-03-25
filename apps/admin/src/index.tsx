import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { FlyinProvider } from '@redbull/components';

import App from './component/App';
import browserHistory from './history';
import store from './store/configureStore';

// Create browser history to use in the Redux store
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={browserHistory}>
        <FlyinProvider>
          <App />
        </FlyinProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
