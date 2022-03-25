import React from 'react';
import { Switch, Route } from 'react-router';
import Calculator from '../Calculator';
import Layout from './Layout';

const Routes = () => (
  <Layout>
    <Switch>
      <Route component={Calculator} path="/calculator" exact />
      <Route component={Calculator} path="/calculator/:type" />
    </Switch>
  </Layout>
);

export default Routes;
