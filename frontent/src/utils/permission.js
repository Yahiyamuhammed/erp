export const hasAnyPermission = (userPermissions, requiredPermissions) => {
  if (!requiredPermissions) return true;

  return requiredPermissions.some((perm) =>
    userPermissions.includes(perm)
  );
};
