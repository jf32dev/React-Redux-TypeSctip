import React from 'react';
import { Switch, Route } from 'react-router';

import AccountDetailPage from '../AccountDetailPage';
import AccountListPage from '../AccountListPage';
import Dashboard from '../Dashboard';
import DocumentPage from '../DocumentPage';
import EarnPage from '../EarnPage';
import LandingPage from '../LandingPage';
import SearchResultsPage from '../SearchResultsPage';
import StoryPage from '../StoryPage';
import Layout from './Layout';

const Routes = () => (
  <Layout>
    <Switch>
      <Route component={Dashboard} path="/" exact />
      <Route component={SearchResultsPage} path="/search" exact />
      <Route component={EarnPage} path="/earn/:urn?" exact />
      <Route component={LandingPage} path="/:page" exact />
      <Route component={LandingPage} path="/:page/channel/:channelId" exact />
      <Route
        component={StoryPage}
        path="/:page/channel/:channelId/story/:storyId"
        exact
      />
      <Route
        component={AccountListPage}
        path="/:page/accounts/:virtualId"
        exact
      />
      <Route
        component={AccountDetailPage}
        path="/:page/accounts/:virtualId/channel/:channelId/:type?"
        exact
      />
      <Route
        component={StoryPage}
        path="/:page/accounts/:virtualId/channel/:channelId/story/:storyId"
        exact
      />
      <Route component={DocumentPage} path="/document/:page" exact />
    </Switch>
  </Layout>
);

export default Routes;
