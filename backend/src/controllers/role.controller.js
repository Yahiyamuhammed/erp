import Role from "../models/Role.js";

export const getRoles = async (req, res) => {
  const roles = await Role.find({}, { name: 1 });
  res.json(roles);
};
export const getRoleById = async (req, res) => {
  const { roleId } = req.params;

  const role = await Role.findById(roleId);
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  res.json({ role });
};

export const updateRolePermissions = async (req, res) => {
  const { roleId } = req.params;
  const { permissions } = req.body;

  if (!Array.isArray(permissions)) {
    return res
      .status(400)
      .json({ message: "Permissions must be an array" });
  }

  const role = await Role.findById(roleId);
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  role.permissions = permissions;
  await role.save();

  res.json({
    message: "Role permissions updated successfully",
    role,
  });
};