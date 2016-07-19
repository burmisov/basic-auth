import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux-immutablejs';
import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from '../reducers';
import { authentificationReducer } from '../../src';
import createRoutes from '../createRoutes';

injectTapEventPlugin();

const createThunkedStore = applyMiddleware(thunk)(createStore);

const reduxStore = createThunkedStore(combineReducers({
  ...reducers,
  ...authentificationReducer,
}));

export default createRoutes(reduxStore);
