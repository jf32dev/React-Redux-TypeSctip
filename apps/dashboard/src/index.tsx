import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import { FlyinProvider } from '@redbull/components';

import App from './component/App';

import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import './i18n';

// Create browser history to use in the Redux store
const history = createHashHistory();
const store = configureStore(history);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <FlyinProvider>
          <App />
        </FlyinProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
