export default function (user, accessPermission, resourceId) {
  let ret = false;

  if (user && user.profile && user.profile.roles) {
    const rolePermissions = user.profile.roles.filter(
      role => role.accessPermissions[accessPermission]
    );

    if (resourceId) {
      if (rolePermissions && rolePermissions.length) {
        if (rolePermissions[0].accessPermissions[accessPermission].indexOf(resourceId) > -1) {
          ret = true;
        }
      }
    } else {
      if (rolePermissions && rolePermissions.length) {
        if (rolePermissions[0].accessPermissions[accessPermission]) {
          ret = true;
        }
      }
    }
  }

  return ret;
}
