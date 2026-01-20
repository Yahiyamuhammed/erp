import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import { rolePermissionMap } from "../seeds/roles.seed.js";

export const getPermissions = async (req, res) => {
  const { roleId } = req.query;

  // CASE 1: no roleId → return ALL permissions (used elsewhere if needed)
  if (!roleId) {
    const permissions = await Permission.find(
      {},
      { code: 1, description: 1 }
    ).sort({ code: 1 });

    return res.json({ permissions });
  }

  // CASE 2: roleId present → role-scoped permissions
  const role = await Role.findOne({
    _id: roleId,
    companyId: req.companyId,
  }).select("name companyId");

  if (!role) {
    return res.status(404).json({
      message: "Role not found or access denied",
    });
  }

  // System roles → immutable → no editable permissions
  if (role.companyId === null) {
    return res.json({ permissions: [] });
  }

  const allowedCodes = rolePermissionMap[role.name] || [];

  const permissions = await Permission.find({
    code: { $in: allowedCodes },
  })
    .select("code description")
    .sort({ code: 1 });

  return res.json({ permissions });
};
