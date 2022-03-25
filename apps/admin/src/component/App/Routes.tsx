import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'qs';

import { AuthStorage, AuthLogin } from '../../api/services/auth/type';
import { authenticate } from '../../store/auth/action';
import { getMyDetail } from '../../store/account/action';
import { useTypedSelector } from '../../store';

import ProductData from '../Calculator/ProductData';
import ProductForm from '../Calculator/ProductForm';
import SliderData from '../Calculator/SliderData';
import SelectCalculator from '../Calculator/SelectCalculator';

import ApplicationData from '../SelfRegistration/ApplicationData';
import ApplicationDetail from '../SelfRegistration/ApplicationDetail';

import ProfileLoadingScreen from './ProfileLoadingScreen';
import Login from '../Login';
import Layout from './Layout';

const onStorageChange = (e: StorageEvent) => {
  const { key } = e;

  // if the user logs out.
  if (!key) {
    window.location.replace('/');
    window.location.reload();
  }
};

const Routes = () => {
  const token = window.localStorage.getItem(AuthStorage.TOKEN);
  const { status, personalDetail } = useTypedSelector((state) => state.account);
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location.pathname.includes('/token')) {
      const parsed = (qs.parse(location.search, {
        ignoreQueryPrefix: true,
      }) as unknown) as AuthLogin;
      dispatch(authenticate(parsed));
    }
  }, [dispatch, location, location.pathname, location.search]);

  React.useEffect(() => {
    window.addEventListener('storage', onStorageChange);
    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  React.useEffect(() => {
    if (token && !personalDetail?.id) {
      dispatch(getMyDetail());
    }
  }, [dispatch, personalDetail, token]);

  if (!token) {
    return (
      <Switch>
        <Route component={Login} path="/" exact />
        <Redirect to="/" />
      </Switch>
    );
  }
  if (token) {
    if (status === 'succeeded') {
      return (
        <Layout>
          <Switch>
            {/* TODO: 
                should probably more into a landing page that redirects the user to specific
                page, eg.: not every user will have registration and not every user will have calculator
            */}
            <Route component={SelectCalculator} path="/calculator" exact />
            <Route
              component={ProductData}
              path="/calculator/:dataType(data)/:country/:calcType(uplift-distribution|uplift-sales-driver|trade-up)/:calcId"
              exact
            />
            <Route
              component={ProductForm}
              path="/calculator/:dataType(data)/:country/:calcType(uplift-distribution|uplift-sales-driver|trade-up)/:calcId/:action(add|edit)/:productId?"
              exact
            />
            <Route
              component={SliderData}
              path="/calculator/:dataType(slider)/:country/:calcType(uplift-distribution|uplift-sales-driver|trade-up)/:calcId"
              exact
            />
            {/* NOTE: Registration portal has been decommisioned for now
                but will be brought back in one of the future phases
            <Route
              component={ApplicationData}
              path="/self-registration"
              exact
            />
            <Route
              component={ApplicationDetail}
              path="/self-registration/:applicationId"
              exact
            /> */}
            <Redirect to="/calculator" />
          </Switch>
        </Layout>
      );
    }
  }
  return (
    <ProfileLoadingScreen
      status={status as Exclude<typeof status, 'succeeded'>}
    />
  );
};

export default Routes;
