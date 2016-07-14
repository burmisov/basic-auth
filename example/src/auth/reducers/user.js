import { fromJS } from 'immutable';
import uuid from 'uuid';

import {
  SIGN_IN,
  SIGN_IN_COMPLETE,
  SIGN_IN_FAILED,
  SIGN_OUT,
  SIGN_OUT_COMPLETE,
  SIGN_OUT_FAILED,
} from './actionTypes';

const defaultState = fromJS({
  isFetching: false,
  error: '',
  profile: {
    id: uuid.v4(),
    roles: ['public'],
  },
});

export default function layers(state = defaultState, action) {
  switch (action.type) {
    case SIGN_IN:
      return state.set('isFetching', true)
      .set('error', '');

    case SIGN_IN_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '').set('profile', action.profile);

    case SIGN_IN_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    case SIGN_OUT:
      return state.set('isFetching', true)
      .set('error', '');

    case SIGN_OUT_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '').set('profile', action.profile);

    case SIGN_OUT_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);
    default:
      return state;
  }
}