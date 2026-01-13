import Role from "../models/Role.js";

export const getRoles = async (req, res) => {
  const filter = req.user.isSuperAdmin ? {} : { companyId: req.companyId };

  const roles = await Role.find(filter)
    .select("name createdAt permissions")
    .lean();

  const formattedRoles = roles.map((role) => ({
    _id: role._id,
    name: role.name,
    createdAt: role.createdAt,
    permissionCount: role.permissions.length,
  }));

  res.status(200).json({ roles: formattedRoles });
};

export const getRoleById = async (req, res) => {
  const { roleId } = req.params;

  const filter = req.user.isSuperAdmin
    ? { _id: roleId }
    : { _id: roleId, companyId: req.companyId };

  const role = await Role.findOne(filter).populate(
    "permissions",
    "name description"
  );

  if (!role) {
    return res.status(404).json({
      message: "Role not found or access denied",
    });
  }

  res.status(200).json({ role });
};
export const updateRolePermissions = async (req, res) => {
  const { roleId } = req.params;
  const { permissionIds } = req.body;

  if (!Array.isArray(permissionIds)) {
    return res.status(400).json({
      message: "permissionIds must be an array",
    });
  }

  const filter = req.user.isSuperAdmin
    ? { _id: roleId }
    : { _id: roleId, companyId: req.companyId };

  const role = await Role.findOne(filter);

  if (!role) {
    return res.status(404).json({
      message: "Role not found or access denied",
    });
  }

  if (!req.user.isSuperAdmin && role.companyId === null) {
    return res.status(403).json({
      message: "System roles cannot be modified",
    });
  }

  role.permissions = permissionIds;
  await role.save();

  const updatedRole = await Role.findById(roleId).populate(
    "permissions",
    "name description"
  );

  res.status(200).json({
    message: "Role permissions updated successfully",
    role: updatedRole,
  });
};
