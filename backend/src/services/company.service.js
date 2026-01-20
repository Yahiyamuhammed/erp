
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";
import { rolePermissionMap } from "../seeds/roles.seed.js";

export const seedCompanyRoles = async (companyId) => {
  const permissions = await Permission.find({});
  const permissionMap = new Map(
    permissions.map((p) => [p.code, p._id])
  );

  const rolesToCreate = Object.entries(rolePermissionMap)
    .filter(([roleName]) => roleName !== "SUPER_ADMIN")
    .map(([roleName, permissionCodes]) => ({
      name: roleName,
      companyId,
      permissions: permissionCodes
        .map((code) => permissionMap.get(code))
        .filter(Boolean),
    }));

  await Role.insertMany(rolesToCreate);
};
