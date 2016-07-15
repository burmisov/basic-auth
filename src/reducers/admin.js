import { Map, Set, fromJS } from 'immutable';

// в нужных местах проверям уровни, а пользователям назначаем роли - содержащие уровни

import {
  // SIGN_UP,
  // SIGN_UP_COMPLETE,
  // SIGN_UP_FAILED,
  SET_LEVEL, // установить уровень для роли
  SET_LEVEL_COMPLETE,
  SET_LEVEL_FAILED,
  SET_ROLE, // установить роль пользователю
  SET_ROLE_COMPLETE,
  SET_ROLE_FAILED,
  REMOVE_LEVEL,
  REMOVE_LEVEL_COMPLETE,
  REMOVE_LEVEL_FAILED,
  REMOVE_ROLE,
  REMOVE_ROLE_COMPLETE,
  REMOVE_ROLE_FAILED,
} from './actionTypes';

const defaultState = fromJS({
  isFetching: false,
  error: '',
});

defaultState.levels = new Set(['user', 'admin', 'public']);
defaultState.roles = new Map({
  public: new Map({
    levels: new Set(['public']),
    userIds: new Set(),
  }),
  user: new Map({
    levels: new Set(['user']),
    userIds: new Set(),
  }),
  admin: new Map({
    levels: new Set(['user', 'admin']),
    userIds: new Set(),
  }),
});

export default function layers(state = defaultState, action) {
  switch (action.type) {
    case SET_LEVEL:
      return state.set('isFetching', true)
      .set('error', '');

    case SET_LEVEL_COMPLETE:
      return state.withMutations(() => {
        state.set('isFetching', false);
        state.set('error', '');
        state.updateIn(['roles', action.role, 'levels'], roles => roles.add(action.level));
      });

    case SET_LEVEL_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    case SET_ROLE:
      return state.set('isFetching', true)
      .set('error', '');

    case SET_ROLE_COMPLETE:
      return state.withMutations(() => {
        state.set('isFetching', false);
        state.set('error', '');
        state.updateIn(['roles', action.role, 'userIds'], userIds => userIds.add(action.userId));
      });

    case SET_ROLE_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    case REMOVE_LEVEL:
      return state.set('isFetching', true)
      .set('error', '');

    case REMOVE_LEVEL_COMPLETE:
      return state.withMutations(() => {
        state.set('isFetching', false);
        state.set('error', '');
        state.updateIn(['roles', action.role, 'levels'], roles => roles.add(action.level));
      });

    case REMOVE_LEVEL_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    case REMOVE_ROLE:
      return state.withMutations(() => {
        state.set('isFetching', false);
        state.set('error', '');
        state.updateIn(['roles', action.role, 'userIds'], userIds => userIds.remove(action.userId));
      });

    case REMOVE_ROLE_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '').set('profile', action.profile);

    case REMOVE_ROLE_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);
    default:
      return state;
  }
}
