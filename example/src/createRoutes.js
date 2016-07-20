import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, Redirect } from 'react-router';

import Layers from './components/Layers';
import Users from './components/Users';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';
import AccessDenied from './components/AccessDenied';
import App from './components/App';
// import { bindAuthentification } from '../../src';
import { calcMd5, checkAccess, bindAuthentification } from '../../src';

export default (reduxStore) => {
  // const requireAccess = bindAuthentification(reduxStore, (nextState, replaceState) => {
  //   replaceState({
  //     next: nextState.location.pathname,
  //     accessPermissions: nextState.accessPermission,
  //     resourceId: nextState.resourceId,
  //   });
  // }, (nextState, replaceState) => {
  //   replaceState({}, '/403');
  // });

  return () => (
    <Provider store={reduxStore}>
      <Router history={browserHistory}>
        <Route component={App}>
          <Redirect from="/" to="/layers" />
          <Route path="/layers" component={Layers} />
          <Route path="/users" component={Users} />
          <Route path="/signin" component={SignIn} />
          <Route path="/403" component={AccessDenied} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  );
};
