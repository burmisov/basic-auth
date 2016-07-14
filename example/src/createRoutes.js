import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, Redirect } from 'react-router';

import Layers from './components/Layers';
import Users from './components/Users';
import NotFound from './components/NotFound';
import App from './components/App';

import bindAuth from './auth/bindAuth';

export default (reduxStore) => {
  const requireAccess = bindAuth(reduxStore, (nextState) => {
    throw new Error('Не авторизован');
  }, (nextState) => {
    throw new Error('Доступ запрещен');
  });

  return () => (
    <Provider store={reduxStore}>
      <Router history={browserHistory}>
        <Route component={App}>
          <Redirect from="/" to="/layers" />
          <Route path="/layers" component={Layers} />
          <Route path="/users" component={Users} onEnter={requireAccess()} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  );
};
