function checkAccess(user, accessPermission, resourceId) {
  if (user.profile.roles) {
    user.profile.roles.forEach((role) => {
      if (role.accessPermissions[accessPermission]) {
        role.accessPermissions[accessPermission].forEach((id) => {
          if (id === resourceId) {
            return true;
          }
        });
      }
    });
  }

  return false;
}

export default function (redux, handleSignIn, handleDenied) {
  return (resourceId, accessPermission) => (nextState, transition) => {
    const storeState = redux.getState();

    const user = storeState.user;

    if (user && !user.isFetching && !user.error && user.profile.name) {
      if (checkAccess(user, accessPermission, resourceId)) {
        return;
      } else {
        nextState.accessPermission = accessPermission;
        nextState.resourceId = resourceId;
        handleSignIn(nextState, transition);
      }
    }

    handleDenied(nextState, transition);
  };
}
