/* eslint no-param-reassign: ["error", { "props": false }]*/

import checkAccess from './checkAccess';

export default function (redux, handleSignIn, handleDenied) {
  return (resourceId, accessPermission) => (nextState, transition) => {
    const storeState = redux.getState();

    const user = storeState.get('user').toJS();

    if (user && !user.isFetching && !user.error && user.profile.name) {
      if (checkAccess(user, accessPermission, resourceId)) {
        return;
      }

      nextState.accessPermission = accessPermission;
      nextState.resourceId = resourceId;
      handleSignIn(nextState, transition);
    }

    handleDenied(nextState, transition);
  };
}
