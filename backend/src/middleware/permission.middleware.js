import User from "../models/User.js";

const checkPermission = (permissionCode) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id).populate({
      path: "roleId",
      populate: {
        path: "permissions"
      }
    });

    if (!user || !user.isActive) {
      return res.status(403).json({ message: "Access denied" });
    }

    const hasPermission = user.roleId.permissions.some(
      (perm) => perm.code === permissionCode
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
};

export default checkPermission;
