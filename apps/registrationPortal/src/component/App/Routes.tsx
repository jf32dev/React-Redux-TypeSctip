import React from 'react';
import { Switch, Route } from 'react-router';

import Layout from './Layout';

import Login from '../Login';
import RegistrationForm from '../RegistrationForm';
import ThankYou from '../ThankYou';

const Routes = () => (
  <Layout>
    <Switch>
      <Route component={Login} path="/" exact />
      <Route component={RegistrationForm} path="/register" exact />
      <Route component={ThankYou} path="/thank-you" exact />
    </Switch>
  </Layout>
);

export default Routes;
