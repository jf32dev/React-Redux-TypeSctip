import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { FlyinProvider } from '@redbull/components';

import App from './component/App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FlyinProvider>
        <App />
      </FlyinProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
