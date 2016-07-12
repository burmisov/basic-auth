import React from 'react';
import { Route, Redirect } from 'react-router';
import Test1 from './components/Test1';
import Test2 from './components/Test2';
import NotFound from './components/NotFound';
import App from './components/App';

export default (
  <Route component={App}>
    <Redirect from="/" to="/test1" />
    <Route path="/test1" component={Test1} />
    <Route path="/test2" component={Test2} />
    <Route path="*" component={NotFound} />
  </Route>
);
