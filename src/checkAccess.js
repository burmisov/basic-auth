export default function checkAccess(user, accessPermission, resourceId) {
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
