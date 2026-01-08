import Permission from "../models/Permission.js";

export const getPermissions = async (req, res) => {
  const permissions = await Permission.find(
    {},
    { code: 1, description: 1 }
  ).sort({ code: 1 });

  res.json({ permissions });
};
