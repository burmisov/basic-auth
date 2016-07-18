import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, Redirect } from 'react-router';

import Layers from './components/Layers';
import Users from './components/Users';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';
import App from './components/App';

import bindAuth from '../../src/bindAuth';

export default (reduxStore) => {
  const requireAccess = bindAuth(reduxStore, (nextState, replaceState) => {
    replaceState({
      next: nextState.location.pathname,
      accessPermissions: nextState.accessPermissions,
    });
  }, (nextState, replaceState) => {
    replaceState({}, '/403');
  });

  return () => (
    <Provider store={reduxStore}>
      <Router history={browserHistory}>
        <Route component={App}>
          <Redirect from="/" to="/layers" />
          <Route path="/layers" component={Layers} />
          <Route path="/users" component={Users} onEnter={requireAccess()} />
          <Route path="/signin" component={SignIn} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  );
};
