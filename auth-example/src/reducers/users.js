import { List, fromJS } from 'immutable';

import {
  LOAD_USERS,
  LOAD_USERS_COMPLETE,
  LOAD_USERS_FAILED,
  INSERT_USER,
  INSERT_USER_COMPLETE,
  INSERT_USER_FAILED,
} from './actionTypes';

const defaultState = fromJS({
  isFetching: false,
  error: '',
});

defaultState.items = new List();

export default function layers(state = defaultState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return state.set('isFetching', true)
      .set('error', '');

    case LOAD_USERS_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '').set('items', new List(action.items));

    case LOAD_USERS_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    case INSERT_USER:
      return state.set('isFetching', true)
      .set('error', '');

    case INSERT_USER_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '')
      .set('items', state.get('items').concat([action.item]));

    case INSERT_USER_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);
    default:
      return state;
  }
}