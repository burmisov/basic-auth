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
  const requireAccess = bindAuth(reduxStore, () => {
    browserHistory.push({
      pathname: '/uauth',
    });
  }, () => {
    browserHistory.push({
      pathname: '/denied',
    });
  });

  return () => (
    <Provider store={reduxStore}>
      <Router history={browserHistory}>
        <Route component={App}>
          <Redirect from="/" to="/layers" />
          <Route path="/layers" component={Layers} />
          <Route path="/users" component={Users} onEnter={requireAccess()} />
          <Route path="/unauth" component={SignIn} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  );
};
