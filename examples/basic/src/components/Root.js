import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux-immutablejs';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from '../routes';
import reducers from '../reducers';

injectTapEventPlugin();

const createThunkedStore = applyMiddleware(thunk)(createStore);

const reduxStore = createThunkedStore(combineReducers(reducers));

const Root = () => (
  <div>
    <Provider store={reduxStore}>
      <Router history={browserHistory} children={routes} />
    </Provider>
  </div>
);

export default Root;
