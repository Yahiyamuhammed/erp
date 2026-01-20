import User from "../models/User.js";

const checkPermission = (permissionCode) => {
  return async (req, res, next) => {
    if (req.user.isSuperAdmin) {
      return next();
    }

    const user = await User.findOne({
      _id: req.user.id,
      companyId: req.companyId,
      isActive: true,
    }).populate({
      path: "roleId",
      populate: {
        path: "permissions",
      },
    });

    if (!user || !user.roleId) {
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
