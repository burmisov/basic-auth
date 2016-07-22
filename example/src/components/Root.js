import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux-immutablejs';
import injectTapEventPlugin from 'react-tap-event-plugin';

import appReducers from '../reducers';
import createRoutes from '../createRoutes';
import { reducers } from '../../../src';

injectTapEventPlugin();

const createThunkedStore = applyMiddleware(thunk)(createStore);

const reduxStore = createThunkedStore(combineReducers({
  ...appReducers,
  ...reducers,
}));

export default createRoutes(reduxStore);
