import React from 'react';
import { Route, Redirect } from 'react-router';
import Layers from './components/Layers';
import Users from './components/Users';
import NotFound from './components/NotFound';
import App from './components/App';

export default (
  <Route component={App}>
    <Redirect from="/" to="/layers" />
    <Route path="/layers" component={Layers} />
    <Route path="/users" component={Users} />
    <Route path="*" component={NotFound} />
  </Route>
);
