import { fromJS } from 'immutable';

import {
  LOAD_USER,
  LOAD_USER_COMPLETE,
  LOAD_USER_FAILED,
  SIGN_IN,
  SIGN_IN_COMPLETE,
  SIGN_IN_FAILED,
  SIGN_OUT,
  SIGN_OUT_COMPLETE,
  SIGN_OUT_FAILED,
} from '../actions/ActionTypes';

const defaultState = fromJS({
  isFetching: false,
  error: '',
  profile: {},
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case SIGN_IN:
    case LOAD_USER:
      return state.set('isFetching', true)
      .set('error', '');

    case SIGN_IN_COMPLETE:
    case LOAD_USER_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '')
      .set('lastUpdated', new Date())
      .set('profile', action.profile);

    case SIGN_IN_FAILED:
    case LOAD_USER_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    case SIGN_OUT:
      return state.set('isFetching', true)
      .set('error', '');

    case SIGN_OUT_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '')
      .set('lastUpdated', new Date())
      .set('profile', {});

    case SIGN_OUT_FAILED:
      return state.set('isFetching', false)
      .set('lastUpdated', new Date())
      .set('error', action.error);

    default:
      return state;
  }
}
