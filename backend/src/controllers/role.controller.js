import Role from "../models/Role.js";

export const getRoles = async (req, res) => {
  const roles = await Role.find({}, { name: 1, createdAt: 1, permissions: 1 });
  const formattedRoles = roles.map((role) => ({
    _id: role._id,
    name: role.name,
    createdAt: role.createdAt,
    permissionCount: role.permissions.length,
  }));

  res.json(formattedRoles);
};
export const getRoleById = async (req, res) => {
  const { roleId } = req.params;

  const role = await Role.findById(roleId).populate(
    "permissions",
    "name description"
  );

  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  res.json({ role });
};

export const updateRolePermissions = async (req, res) => {
  const { roleId } = req.params;
  const { permissionIds } = req.body;

  if (!Array.isArray(permissionIds)) {
    return res.status(400).json({ message: "permissionIds must be an array" });
  }

  const role = await Role.findById(roleId);
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  role.permissions = permissionIds;
  await role.save();

  const updatedRole = await Role.findById(roleId).populate(
    "permissions",
    "name description"
  );

  res.json({
    message: "Permissions updated successfully",
    role: updatedRole,
  });
};
