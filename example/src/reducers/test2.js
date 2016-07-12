import { fromJS } from 'immutable';

import {
  LOAD_TEST2,
  LOAD_TEST2_COMPLETE,
  LOAD_TEST2_FAILED,
  INSERT_TEST2,
  INSERT_TEST2_COMPLETE,
  INSERT_TEST2_FAILED,
} from './actionTypes';

const defaultState = fromJS({
  isFetching: false,
  error: '',
  items: [],
});

export default function layers(state = defaultState, action) {
  let arr;

  switch (action.type) {
    case LOAD_TEST2:
      return state.set('isFetching', true)
      .set('error', '');

    case LOAD_TEST2_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '').set('items', action.items);

    case LOAD_TEST2_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    case INSERT_TEST2:
      return state.set('isFetching', true)
      .set('error', '');

    case INSERT_TEST2_COMPLETE:
      arr = state.get('items');
      arr.push(action.item);

      return state.set('isFetching', false)
      .set('error', '').set('items', arr);

    case INSERT_TEST2_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);
    default:
      return state;
  }
}
