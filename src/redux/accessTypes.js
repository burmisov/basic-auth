import { fromJS } from 'immutable';

import {
  LOAD_ACCESS_TYPES,
  LOAD_ACCESS_TYPES_COMPLETE,
  LOAD_ACCESS_TYPES_FAILED,
} from './actionTypes';

const defaultState = fromJS({
  isFetching: false,
  error: '',
  items: [],
});

export default function layers(state = defaultState, action) {
  switch (action.type) {
    case LOAD_ACCESS_TYPES:
      return state.set('isFetching', true)
      .set('error', '');

    case LOAD_ACCESS_TYPES_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '')
      .set('lastUpdated', new Date())
      .set('items', action.items);

    case LOAD_ACCESS_TYPES_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    default:
      return state;
  }
}
