import { fromJS } from 'immutable';

import {
  LOAD_TEST1,
  LOAD_TEST1_COMPLETE,
  LOAD_TEST1_FAILED,
  INSERT_TEST1,
  INSERT_TEST1_COMPLETE,
  INSERT_TEST1_FAILED,
} from './actionTypes';

const defaultState = fromJS({
  isFetching: false,
  error: '',
  items: [],
});

export default function layers(state = defaultState, action) {
  let arr;

  switch (action.type) {
    case LOAD_TEST1:
      return state.set('isFetching', true)
      .set('error', '');

    case LOAD_TEST1_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '').set('items', action.items);

    case LOAD_TEST1_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    case INSERT_TEST1:
      return state.set('isFetching', true)
      .set('error', '');

    case INSERT_TEST1_COMPLETE:
      arr = state.get('items');
      arr.push(action.item);

      return state.set('isFetching', false)
      .set('error', '').set('items', arr);

    case INSERT_TEST1_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    default:
      return state;
  }
}
