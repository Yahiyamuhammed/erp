import Role from "../models/Role.js";

export const getRoles = async (req, res) => {
  const roles = await Role.find({}, { name: 1 });
  res.json(roles);
};
